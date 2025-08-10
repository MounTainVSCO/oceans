import { Module } from '@nestjs/common';
import { PublishingController } from './publishing.controller';
import { PublishingService } from './publishing.service';
import { DNSService } from './dns.service';
import { HostingService } from './hosting.service';

@Module({
  controllers: [PublishingController],
  providers: [PublishingService, DNSService, HostingService],
  exports: [PublishingService],
})
export class PublishingModule {}
