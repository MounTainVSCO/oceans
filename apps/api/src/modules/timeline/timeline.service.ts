import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';

@Injectable()
export class TimelineService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTimelineDto: CreateTimelineDto) {
    return this.prisma.timeline.create({
      data: {
        ...createTimelineDto,
        userId,
      },
      include: {
        milestones: {
          orderBy: { date: 'desc' },
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.timeline.findMany({
      where: { userId },
      include: {
        milestones: {
          orderBy: { date: 'desc' },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const timeline = await this.prisma.timeline.findFirst({
      where: { id, userId },
      include: {
        milestones: {
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!timeline) {
      throw new NotFoundException('Timeline not found');
    }

    return timeline;
  }

  async update(id: string, userId: string, updateTimelineDto: UpdateTimelineDto) {
    const timeline = await this.prisma.timeline.findFirst({
      where: { id, userId },
    });

    if (!timeline) {
      throw new NotFoundException('Timeline not found');
    }

    return this.prisma.timeline.update({
      where: { id },
      data: updateTimelineDto,
      include: {
        milestones: {
          orderBy: { date: 'desc' },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const timeline = await this.prisma.timeline.findFirst({
      where: { id, userId },
    });

    if (!timeline) {
      throw new NotFoundException('Timeline not found');
    }

    return this.prisma.timeline.delete({
      where: { id },
    });
  }
}