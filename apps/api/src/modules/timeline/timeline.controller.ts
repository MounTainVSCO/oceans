import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('timelines')
@UseGuards(JwtAuthGuard)
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Post()
  create(@Request() req: any, @Body() createTimelineDto: CreateTimelineDto) {
    return this.timelineService.create(req.user.id, createTimelineDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.timelineService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.timelineService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: any,
    @Body() updateTimelineDto: UpdateTimelineDto,
  ) {
    return this.timelineService.update(id, req.user.id, updateTimelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.timelineService.remove(id, req.user.id);
  }
}