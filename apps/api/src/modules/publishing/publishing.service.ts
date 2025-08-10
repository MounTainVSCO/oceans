import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DNSService } from './dns.service';
import { HostingService } from './hosting.service';
import { CheckSubdomainDto, CreateSiteDto, UpdateSiteDto } from './dto/publishing.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class PublishingService {
  constructor(
    private prisma: PrismaService,
    private dnsService: DNSService,
    private hostingService: HostingService
  ) {}

  async checkSubdomainAvailability(dto: CheckSubdomainDto) {
    const { subdomain } = dto;

    // Check reserved subdomains
    const reservedSubdomains = [
      'www', 'api', 'admin', 'app', 'blog', 'mail', 'ftp', 'ssh',
      'staging', 'dev', 'test', 'docs', 'help', 'support', 'status',
      'cdn', 'assets', 'static', 'media', 'images', 'js', 'css'
    ];

    if (reservedSubdomains.includes(subdomain.toLowerCase())) {
      return {
        available: false,
        reason: 'This subdomain is reserved for system use'
      };
    }

    // Check if subdomain exists in database
    const existingSite = await this.prisma.site.findUnique({
      where: { subdomain }
    });

    return {
      available: !existingSite,
      reason: existingSite ? 'This subdomain is already taken' : null
    };
  }

  async createSite(userId: string, dto: CreateSiteDto) {
    // First check availability
    const availability = await this.checkSubdomainAvailability({ subdomain: dto.subdomain });
    if (!availability.available) {
      throw new ConflictException(availability.reason);
    }

    // Validate timeline exists and belongs to user
    if (dto.timelineId) {
      const timeline = await this.prisma.timeline.findFirst({
        where: {
          id: dto.timelineId,
          userId: userId
        }
      });

      if (!timeline) {
        throw new NotFoundException('Timeline not found or does not belong to user');
      }
    }

    // Create site record
    const site = await this.prisma.site.create({
      data: {
        subdomain: dto.subdomain,
        title: dto.title,
        description: dto.description,
        layout: dto.layout,
        userId: userId,
        timelineId: dto.timelineId,
        buildStatus: 'pending'
      },
      include: {
        user: {
          select: { id: true, email: true, name: true }
        },
        timeline: {
          include: {
            milestones: true
          }
        }
      }
    });

    // Trigger build process
    this.triggerSiteBuild(site.id).catch(console.error);

    return {
      id: site.id,
      subdomain: site.subdomain,
      title: site.title,
      description: site.description,
      layout: site.layout,
      buildStatus: site.buildStatus,
      url: `https://${site.subdomain}.oceans.life`,
      createdAt: site.createdAt
    };
  }

  async getUserSites(userId: string) {
    const sites = await this.prisma.site.findMany({
      where: { userId },
      include: {
        timeline: {
          select: { id: true, title: true, description: true }
        },
        deployments: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return sites.map(site => ({
      id: site.id,
      subdomain: site.subdomain,
      title: site.title,
      description: site.description,
      layout: site.layout,
      buildStatus: site.buildStatus,
      isActive: site.isActive,
      url: `https://${site.subdomain}.oceans.life`,
      timeline: site.timeline,
      lastDeployment: site.deployments[0] || null,
      createdAt: site.createdAt,
      updatedAt: site.updatedAt
    }));
  }

  async updateSite(userId: string, siteId: string, dto: UpdateSiteDto) {
    const site = await this.prisma.site.findFirst({
      where: { id: siteId, userId }
    });

    if (!site) {
      throw new NotFoundException('Site not found or does not belong to user');
    }

    const updatedSite = await this.prisma.site.update({
      where: { id: siteId },
      data: dto
    });

    // If layout changed, trigger rebuild
    if (dto.layout && dto.layout !== site.layout) {
      this.triggerSiteBuild(siteId).catch(console.error);
    }

    return {
      id: updatedSite.id,
      subdomain: updatedSite.subdomain,
      title: updatedSite.title,
      description: updatedSite.description,
      layout: updatedSite.layout,
      buildStatus: updatedSite.buildStatus,
      isActive: updatedSite.isActive,
      url: `https://${updatedSite.subdomain}.oceans.life`,
      updatedAt: updatedSite.updatedAt
    };
  }

  async deleteSite(userId: string, siteId: string) {
    const site = await this.prisma.site.findFirst({
      where: { id: siteId, userId }
    });

    if (!site) {
      throw new NotFoundException('Site not found or does not belong to user');
    }

    // TODO: Clean up deployed files and DNS records
    await this.cleanupDeployedSite(site.subdomain);

    await this.prisma.site.delete({
      where: { id: siteId }
    });

    return { message: 'Site deleted successfully' };
  }

  private async triggerSiteBuild(siteId: string) {
    try {
      // Update build status
      await this.prisma.site.update({
        where: { id: siteId },
        data: { buildStatus: 'building' }
      });

      // Create deployment record
      const deployment = await this.prisma.siteDeployment.create({
        data: {
          siteId: siteId,
          status: 'building'
        }
      });

      // Get site data with timeline
      const site = await this.prisma.site.findUnique({
        where: { id: siteId },
        include: {
          user: true,
          timeline: {
            include: {
              milestones: {
                orderBy: { date: 'asc' }
              }
            }
          }
        }
      });

      if (!site) {
        throw new Error('Site not found');
      }

      // Generate static site
      const buildResult = await this.generateStaticSite(site);

      // Deploy to hosting service (e.g., Vercel, Netlify, or custom)
      const deployUrl = await this.deployToHosting(site.subdomain, buildResult.buildDir);

      // Configure DNS/subdomain routing
      await this.configureDNS(site.subdomain, deployUrl);

      // Update site with success status
      await this.prisma.site.update({
        where: { id: siteId },
        data: {
          buildStatus: 'deployed',
          deployUrl: deployUrl,
          lastDeployAt: new Date()
        }
      });

      // Update deployment record
      await this.prisma.siteDeployment.update({
        where: { id: deployment.id },
        data: {
          status: 'success',
          buildLog: buildResult.log
        }
      });

    } catch (error) {
      console.error('Build failed:', error);

      // Update with failed status
      await this.prisma.site.update({
        where: { id: siteId },
        data: { buildStatus: 'failed' }
      });

      // Update deployment record
      const deployment = await this.prisma.siteDeployment.findFirst({
        where: { siteId },
        orderBy: { createdAt: 'desc' }
      });

      if (deployment) {
        await this.prisma.siteDeployment.update({
          where: { id: deployment.id },
          data: {
            status: 'failed',
            buildLog: error.message
          }
        });
      }
    }
  }

  private async generateStaticSite(site: any) {
    // Create temporary build directory
    const buildDir = path.join(process.cwd(), 'temp', `build-${site.id}`);
    await fs.mkdir(buildDir, { recursive: true });

    // Transform timeline data to life story format
    const lifeStory = this.transformTimelineToLifeStory(site.timeline, site.title, site.description);

    // Generate HTML based on selected layout
    const htmlContent = this.generateHTML(lifeStory, site.layout, site.title);

    // Write files
    await fs.writeFile(path.join(buildDir, 'index.html'), htmlContent);
    await this.copyStaticAssets(buildDir);

    return {
      buildDir,
      log: `Successfully built site for ${site.subdomain} with ${site.layout} layout`
    };
  }

  private transformTimelineToLifeStory(timeline: any, title: string, description: string) {
    if (!timeline || !timeline.milestones) {
      return {
        title,
        subtitle: description || 'My Life Story',
        chapters: []
      };
    }

    // Group milestones by year
    const milestonesByYear = timeline.milestones.reduce((acc: any, milestone: any) => {
      const year = new Date(milestone.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push({
        id: milestone.id,
        date: new Date(milestone.date).toLocaleDateString(),
        title: milestone.title,
        content: milestone.description || '',
        mood: milestone.category || 'happy',
        tags: milestone.category ? [milestone.category] : []
      });
      return acc;
    }, {});

    const chapters = Object.entries(milestonesByYear).map(([year, stories]: [string, any]) => ({
      id: parseInt(year),
      year,
      title: `Year ${year}`,
      stories
    }));

    return {
      title,
      subtitle: description || timeline.description || 'My Life Story',
      chapters: chapters.sort((a, b) => parseInt(a.year) - parseInt(b.year))
    };
  }

  private generateHTML(lifeStory: any, layout: string, title: string) {
    // This would generate the React component as static HTML
    // For now, return a simple HTML template
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-amatic bg-gradient-to-br from-amber-50 to-orange-50">
    <div class="min-h-screen p-8">
        <div class="max-w-4xl mx-auto">
            <header class="text-center mb-12">
                <h1 class="text-6xl font-bold text-amber-900 mb-4" style="font-family: 'Amatic SC', cursive;">
                    ${lifeStory.title}
                </h1>
                <p class="text-2xl text-amber-700" style="font-family: 'Amatic SC', cursive;">
                    ${lifeStory.subtitle}
                </p>
            </header>
            
            <main>
                ${this.generateLayoutHTML(lifeStory, layout)}
            </main>
        </div>
    </div>
</body>
</html>`;
  }

  private generateLayoutHTML(lifeStory: any, layout: string) {
    // Generate different HTML based on layout type
    switch (layout) {
      case 'timeline':
        return this.generateTimelineHTML(lifeStory);
      case 'calendar':
        return this.generateCalendarHTML(lifeStory);
      case 'scrapbook':
        return this.generateScrapbookHTML(lifeStory);
      default:
        return this.generateTimelineHTML(lifeStory);
    }
  }

  private generateTimelineHTML(lifeStory: any) {
    const storiesHTML = lifeStory.chapters.flatMap((chapter: any) => 
      chapter.stories.map((story: any) => `
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-6">
          <h3 class="text-2xl font-bold text-amber-900 mb-2" style="font-family: 'Amatic SC', cursive;">
            ${story.title}
          </h3>
          <p class="text-lg text-amber-700 mb-4" style="font-family: 'Amatic SC', cursive;">
            ${story.date}
          </p>
          <p class="text-lg text-amber-800 leading-relaxed" style="font-family: 'Amatic SC', cursive;">
            ${story.content}
          </p>
        </div>
      `)
    ).join('');

    return `<div class="space-y-6">${storiesHTML}</div>`;
  }

  private generateCalendarHTML(lifeStory: any) {
    // Simple calendar layout
    return this.generateTimelineHTML(lifeStory);
  }

  private generateScrapbookHTML(lifeStory: any) {
    // Simple scrapbook layout
    return this.generateTimelineHTML(lifeStory);
  }

  private async copyStaticAssets(buildDir: string) {
    // Copy any static assets like CSS, JS, images
    // For now, just create empty assets directory
    await fs.mkdir(path.join(buildDir, 'assets'), { recursive: true });
  }

  private async deployToHosting(subdomain: string, buildDir: string): Promise<string> {
    const result = await this.hostingService.deploy({
      subdomain,
      buildDir,
      siteTitle: `${subdomain} - Oceans Life`,
    });

    if (!result.success) {
      throw new Error(result.error || 'Deployment failed');
    }

    return result.deployUrl!;
  }

  private async configureDNS(subdomain: string, deployUrl: string) {
    const success = await this.dnsService.createSubdomainRecord(subdomain, deployUrl);
    
    if (!success) {
      console.warn(`DNS configuration failed for ${subdomain}, but continuing...`);
    }

    // Optional: Wait for DNS propagation
    setTimeout(async () => {
      const propagated = await this.dnsService.verifyDNSPropagation(subdomain);
      console.log(`DNS propagation for ${subdomain}: ${propagated ? 'Success' : 'Still propagating'}`);
    }, 30000); // Check after 30 seconds
  }

  private async cleanupDeployedSite(subdomain: string) {
    // Clean up DNS records
    await this.dnsService.deleteSubdomainRecord(subdomain);
    
    // TODO: Clean up hosting files (depends on hosting provider)
    console.log(`Cleaned up deployment for ${subdomain}`);
  }
}
