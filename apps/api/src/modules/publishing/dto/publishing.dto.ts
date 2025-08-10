import { IsString, IsOptional, IsBoolean, Matches, MinLength, MaxLength } from 'class-validator';

export class CheckSubdomainDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Subdomain can only contain lowercase letters, numbers, and hyphens'
  })
  subdomain: string;
}

export class CreateSiteDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Subdomain can only contain lowercase letters, numbers, and hyphens'
  })
  subdomain: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @IsString()
  layout: string; // timeline, calendar, scrapbook, etc.

  @IsOptional()
  @IsString()
  timelineId?: string;
}

export class UpdateSiteDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsString()
  layout?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class DeploySiteDto {
  @IsString()
  siteId: string;
}
