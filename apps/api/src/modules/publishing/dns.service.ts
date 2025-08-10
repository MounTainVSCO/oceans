import { Injectable } from '@nestjs/common';

@Injectable()
export class DNSService {
  private cloudflareApiKey = process.env.CLOUDFLARE_API_KEY;
  private cloudflareEmail = process.env.CLOUDFLARE_EMAIL;
  private zoneId = process.env.CLOUDFLARE_ZONE_ID; // oceans.life zone ID

  async createSubdomainRecord(subdomain: string, targetUrl: string): Promise<boolean> {
    if (!this.cloudflareApiKey || !this.cloudflareEmail || !this.zoneId) {
      console.warn('Cloudflare credentials not configured, skipping DNS setup');
      return true; // Return true for development/testing
    }

    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${this.zoneId}/dns_records`, {
        method: 'POST',
        headers: {
          'X-Auth-Email': this.cloudflareEmail,
          'X-Auth-Key': this.cloudflareApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'CNAME',
          name: subdomain,
          content: new URL(targetUrl).hostname,
          ttl: 1, // Auto TTL
          proxied: true // Enable Cloudflare proxy for SSL and CDN
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Cloudflare API error:', result);
        return false;
      }

      console.log(`Successfully created DNS record for ${subdomain}.oceans.life`);
      return true;

    } catch (error) {
      console.error('Error creating DNS record:', error);
      return false;
    }
  }

  async deleteSubdomainRecord(subdomain: string): Promise<boolean> {
    if (!this.cloudflareApiKey || !this.cloudflareEmail || !this.zoneId) {
      console.warn('Cloudflare credentials not configured, skipping DNS cleanup');
      return true;
    }

    try {
      // First, find the record ID
      const listResponse = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${this.zoneId}/dns_records?type=CNAME&name=${subdomain}.oceans.life`,
        {
          headers: {
            'X-Auth-Email': this.cloudflareEmail,
            'X-Auth-Key': this.cloudflareApiKey,
          },
        }
      );

      const listResult = await listResponse.json();

      if (!listResponse.ok || !listResult.result?.length) {
        console.warn(`No DNS record found for ${subdomain}.oceans.life`);
        return true;
      }

      // Delete the record
      const recordId = listResult.result[0].id;
      const deleteResponse = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${this.zoneId}/dns_records/${recordId}`,
        {
          method: 'DELETE',
          headers: {
            'X-Auth-Email': this.cloudflareEmail,
            'X-Auth-Key': this.cloudflareApiKey,
          },
        }
      );

      const deleteResult = await deleteResponse.json();

      if (!deleteResponse.ok) {
        console.error('Error deleting DNS record:', deleteResult);
        return false;
      }

      console.log(`Successfully deleted DNS record for ${subdomain}.oceans.life`);
      return true;

    } catch (error) {
      console.error('Error deleting DNS record:', error);
      return false;
    }
  }

  async updateSubdomainRecord(subdomain: string, newTargetUrl: string): Promise<boolean> {
    // For now, delete and recreate the record
    await this.deleteSubdomainRecord(subdomain);
    return this.createSubdomainRecord(subdomain, newTargetUrl);
  }

  async verifyDNSPropagation(subdomain: string): Promise<boolean> {
    try {
      // Use DNS over HTTPS to check if the record has propagated
      const response = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${subdomain}.oceans.life&type=CNAME`,
        {
          headers: {
            'Accept': 'application/dns-json',
          },
        }
      );

      const result = await response.json();
      return result.Status === 0 && result.Answer?.length > 0;

    } catch (error) {
      console.error('Error checking DNS propagation:', error);
      return false;
    }
  }
}
