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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { SitesService } from './sites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSiteDto, UpdateSiteDto, SiteResponseDto } from './dto/sites.dto';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    name: string;
    isPro: boolean;
  };
}

@ApiTags('Sites')
@Controller('sites')
export class SitesController {
  constructor(private sitesService: SitesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new site' })
  @ApiResponse({
    status: 201,
    description: 'Site created successfully',
    type: SiteResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Site slug already exists' })
  async createSite(
    @Request() req: RequestWithUser,
    @Body() dto: CreateSiteDto
  ): Promise<SiteResponseDto> {
    return this.sitesService.createSite(req.user.id, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all sites for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Sites retrieved successfully',
    type: [SiteResponseDto],
  })
  async getUserSites(
    @Request() req: RequestWithUser
  ): Promise<SiteResponseDto[]> {
    return this.sitesService.getUserSites(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific site by ID' })
  @ApiParam({ name: 'id', description: 'Site ID' })
  @ApiResponse({
    status: 200,
    description: 'Site retrieved successfully',
    type: SiteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Site not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getSiteById(
    @Request() req: RequestWithUser,
    @Param('id') siteId: string
  ): Promise<SiteResponseDto> {
    return this.sitesService.getSiteById(req.user.id, siteId);
  }

  @Get('public/:slug')
  @ApiOperation({ summary: 'Get a public site by slug' })
  @ApiParam({ name: 'slug', description: 'Site slug' })
  @ApiResponse({
    status: 200,
    description: 'Site retrieved successfully',
    type: SiteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Site not found' })
  @ApiResponse({ status: 403, description: 'Site is private' })
  async getSiteBySlug(@Param('slug') slug: string): Promise<SiteResponseDto> {
    return this.sitesService.getSiteBySlug(slug);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a site' })
  @ApiParam({ name: 'id', description: 'Site ID' })
  @ApiResponse({
    status: 200,
    description: 'Site updated successfully',
    type: SiteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Site not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 409, description: 'Site slug already exists' })
  async updateSite(
    @Request() req: RequestWithUser,
    @Param('id') siteId: string,
    @Body() dto: UpdateSiteDto
  ): Promise<SiteResponseDto> {
    return this.sitesService.updateSite(req.user.id, siteId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a site' })
  @ApiParam({ name: 'id', description: 'Site ID' })
  @ApiResponse({ status: 204, description: 'Site deleted successfully' })
  @ApiResponse({ status: 404, description: 'Site not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async deleteSite(
    @Request() req: RequestWithUser,
    @Param('id') siteId: string
  ): Promise<void> {
    return this.sitesService.deleteSite(req.user.id, siteId);
  }
}
