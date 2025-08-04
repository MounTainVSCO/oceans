import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateSiteDto {
  @ApiProperty({ description: 'Site name' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Site slug (URL-friendly name)' })
  @IsString()
  slug!: string;

  @ApiProperty({ description: 'Site description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Site template type' })
  @IsOptional()
  @IsString()
  template?: string;

  @ApiProperty({ description: 'Custom domain (optional)' })
  @IsOptional()
  @IsUrl()
  domain?: string;

  @ApiProperty({ description: 'Whether the site is public', default: true })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

export class UpdateSiteDto {
  @ApiProperty({ description: 'Site name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Site slug (URL-friendly name)' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'Site description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Site template type' })
  @IsOptional()
  @IsString()
  template?: string;

  @ApiProperty({ description: 'Custom domain (optional)' })
  @IsOptional()
  @IsUrl()
  domain?: string;

  @ApiProperty({ description: 'Whether the site is public' })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

export class SiteResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  template?: string;

  @ApiProperty()
  domain?: string;

  @ApiProperty()
  isPublic!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty()
  userId!: string;
}
