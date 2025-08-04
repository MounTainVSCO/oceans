import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteDto, UpdateSiteDto, SiteResponseDto } from './dto/sites.dto';

@Injectable()
export class SitesService {
  constructor(private prisma: PrismaService) {}

  async createSite(
    userId: string,
    dto: CreateSiteDto
  ): Promise<SiteResponseDto> {
    // Check if slug is already taken
    const existingSite = await this.prisma.site.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSite) {
      throw new ConflictException('Site with this slug already exists');
    }

    // Create the site
    const site = await this.prisma.site.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        domain: dto.domain,
        isPublic: dto.isPublic ?? true,
        userId,
      },
    });

    return this.mapToResponseDto(site);
  }

  async getUserSites(userId: string): Promise<SiteResponseDto[]> {
    const sites = await this.prisma.site.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });

    return sites.map(site => this.mapToResponseDto(site));
  }

  async getSiteById(userId: string, siteId: string): Promise<SiteResponseDto> {
    const site = await this.prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!site) {
      throw new NotFoundException('Site not found');
    }

    if (site.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.mapToResponseDto(site);
  }

  async getSiteBySlug(slug: string): Promise<SiteResponseDto> {
    const site = await this.prisma.site.findUnique({
      where: { slug },
    });

    if (!site) {
      throw new NotFoundException('Site not found');
    }

    if (!site.isPublic) {
      throw new ForbiddenException('Site is private');
    }

    return this.mapToResponseDto(site);
  }

  async updateSite(
    userId: string,
    siteId: string,
    dto: UpdateSiteDto
  ): Promise<SiteResponseDto> {
    // Check if site exists and user owns it
    const existingSite = await this.prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!existingSite) {
      throw new NotFoundException('Site not found');
    }

    if (existingSite.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // Check if new slug is already taken (if being updated)
    if (dto.slug && dto.slug !== existingSite.slug) {
      const slugExists = await this.prisma.site.findUnique({
        where: { slug: dto.slug },
      });

      if (slugExists) {
        throw new ConflictException('Site with this slug already exists');
      }
    }

    // Update the site
    const updatedSite = await this.prisma.site.update({
      where: { id: siteId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.slug && { slug: dto.slug }),
        ...(dto.domain !== undefined && { domain: dto.domain }),
        ...(dto.isPublic !== undefined && { isPublic: dto.isPublic }),
      },
    });

    return this.mapToResponseDto(updatedSite);
  }

  async deleteSite(userId: string, siteId: string): Promise<void> {
    // Check if site exists and user owns it
    const site = await this.prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!site) {
      throw new NotFoundException('Site not found');
    }

    if (site.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // Delete the site (cascade will handle related data)
    await this.prisma.site.delete({
      where: { id: siteId },
    });
  }

  private mapToResponseDto(site: any): SiteResponseDto {
    return {
      id: site.id,
      name: site.name,
      slug: site.slug,
      domain: site.domain,
      isPublic: site.isPublic,
      createdAt: site.createdAt,
      updatedAt: site.updatedAt,
      userId: site.userId,
    };
  }
}
