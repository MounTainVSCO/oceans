import { Module } from '@nestjs/common';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TimelineController, MilestoneController],
  providers: [TimelineService, MilestoneService],
  exports: [TimelineService, MilestoneService],
})
export class TimelineModule {}