import { Injectable } from '@nestjs/common';

interface DeploymentConfig {
  subdomain: string;
  buildDir: string;
  siteTitle: string;
}

interface DeploymentResult {
  success: boolean;
  deployUrl?: string;
  error?: string;
}

@Injectable()
export class HostingService {
  private vercelToken = process.env.VERCEL_TOKEN;
  private netlifyToken = process.env.NETLIFY_ACCESS_TOKEN;

  async deployToVercel(config: DeploymentConfig): Promise<DeploymentResult> {
    if (!this.vercelToken) {
      return { success: false, error: 'Vercel token not configured' };
    }

    try {
      // Create deployment using Vercel API
      const response = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.vercelToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `oceans-${config.subdomain}`,
          files: [
            {
              file: 'index.html',
              data: await this.readBuildFile(config.buildDir, 'index.html'),
            },
            {
              file: 'package.json',
              data: JSON.stringify({
                name: `oceans-${config.subdomain}`,
                version: '1.0.0',
                scripts: {
                  start: 'serve -s .',
                },
                dependencies: {
                  serve: '^14.0.0',
                },
              }),
            },
          ],
          projectSettings: {
            framework: null,
            buildCommand: null,
            outputDirectory: null,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error?.message || 'Vercel deployment failed' };
      }

      // Wait for deployment to be ready
      const deploymentUrl = `https://${result.url}`;
      await this.waitForDeployment(deploymentUrl);

      return {
        success: true,
        deployUrl: deploymentUrl,
      };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deployToNetlify(config: DeploymentConfig): Promise<DeploymentResult> {
    if (!this.netlifyToken) {
      return { success: false, error: 'Netlify token not configured' };
    }

    try {
      // Create site on Netlify
      const siteResponse = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.netlifyToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `oceans-${config.subdomain}`,
        }),
      });

      const site = await siteResponse.json();

      if (!siteResponse.ok) {
        return { success: false, error: site.message || 'Netlify site creation failed' };
      }

      // Deploy files to site
      const deployResponse = await fetch(`https://api.netlify.com/api/v1/sites/${site.id}/deploys`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.netlifyToken}`,
          'Content-Type': 'application/zip',
        },
        body: await this.createDeploymentZip(config.buildDir),
      });

      const deploy = await deployResponse.json();

      if (!deployResponse.ok) {
        return { success: false, error: deploy.message || 'Netlify deployment failed' };
      }

      return {
        success: true,
        deployUrl: deploy.deploy_ssl_url || deploy.deploy_url,
      };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deployToS3CloudFront(config: DeploymentConfig): Promise<DeploymentResult> {
    // AWS S3 + CloudFront deployment would go here
    // This requires AWS SDK setup
    return { success: false, error: 'AWS deployment not implemented yet' };
  }

  private async readBuildFile(buildDir: string, filename: string): Promise<string> {
    const fs = await import('fs/promises');
    const path = await import('path');
    return fs.readFile(path.join(buildDir, filename), 'utf-8');
  }

  private async createDeploymentZip(buildDir: string): Promise<Buffer> {
    // Create a ZIP file of the build directory
    const AdmZip = await import('adm-zip');
    const zip = new AdmZip.default();
    
    // Add files to zip
    zip.addLocalFolder(buildDir);
    
    return zip.toBuffer();
  }

  private async waitForDeployment(url: string, maxAttempts = 30): Promise<void> {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          return;
        }
      } catch (error) {
        // Deployment not ready yet
      }
      
      // Wait 2 seconds before next attempt
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    throw new Error('Deployment verification timeout');
  }

  // Choose the best deployment method based on configuration
  async deploy(config: DeploymentConfig): Promise<DeploymentResult> {
    // Try Vercel first (fastest), then Netlify as fallback
    if (this.vercelToken) {
      const vercelResult = await this.deployToVercel(config);
      if (vercelResult.success) {
        return vercelResult;
      }
      console.warn('Vercel deployment failed, trying Netlify:', vercelResult.error);
    }

    if (this.netlifyToken) {
      return this.deployToNetlify(config);
    }

    return { success: false, error: 'No hosting service configured' };
  }
}
