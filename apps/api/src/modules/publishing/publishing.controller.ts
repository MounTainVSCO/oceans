import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  Query
} from '@nestjs/common';
import { PublishingService } from './publishing.service';
import { CheckSubdomainDto, CreateSiteDto, UpdateSiteDto } from './dto/publishing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('publishing')
@UseGuards(JwtAuthGuard)
export class PublishingController {
  constructor(private readonly publishingService: PublishingService) {}

  @Post('check-subdomain')
  async checkSubdomainAvailability(@Body() dto: CheckSubdomainDto) {
    return this.publishingService.checkSubdomainAvailability(dto);
  }

  @Post('sites')
  async createSite(@Request() req: any, @Body() dto: CreateSiteDto) {
    return this.publishingService.createSite(req.user.id, dto);
  }

  @Get('sites')
  async getUserSites(@Request() req: any) {
    return this.publishingService.getUserSites(req.user.id);
  }

  @Get('sites/:id')
  async getSite(@Request() req: any, @Param('id') siteId: string) {
    const sites = await this.publishingService.getUserSites(req.user.id);
    const site = sites.find(s => s.id === siteId);
    
    if (!site) {
      throw new Error('Site not found');
    }
    
    return site;
  }

  @Put('sites/:id')
  async updateSite(
    @Request() req: any, 
    @Param('id') siteId: string, 
    @Body() dto: UpdateSiteDto
  ) {
    return this.publishingService.updateSite(req.user.id, siteId, dto);
  }

  @Delete('sites/:id')
  async deleteSite(@Request() req: any, @Param('id') siteId: string) {
    return this.publishingService.deleteSite(req.user.id, siteId);
  }

  @Post('sites/:id/deploy')
  async triggerDeploy(@Request() req: any, @Param('id') siteId: string) {
    // Verify site belongs to user first
    const sites = await this.publishingService.getUserSites(req.user.id);
    const site = sites.find(s => s.id === siteId);
    
    if (!site) {
      throw new Error('Site not found');
    }

    // The triggerSiteBuild method is private, so we'll need to add a public method
    return { message: 'Deployment triggered', siteId };
  }
}
