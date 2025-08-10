import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('timelines/:timelineId/milestones')
@UseGuards(JwtAuthGuard)
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  @Post()
  create(
    @Param('timelineId') timelineId: string,
    @Body() createMilestoneDto: CreateMilestoneDto,
  ) {
    return this.milestoneService.create(timelineId, createMilestoneDto);
  }

  @Get()
  findAll(@Param('timelineId') timelineId: string) {
    return this.milestoneService.findAll(timelineId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMilestoneDto: UpdateMilestoneDto) {
    return this.milestoneService.update(id, updateMilestoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milestoneService.remove(id);
  }
}