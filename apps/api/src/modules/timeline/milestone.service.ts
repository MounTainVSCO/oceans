import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';

@Injectable()
export class MilestoneService {
  constructor(private prisma: PrismaService) {}

  async create(timelineId: string, createMilestoneDto: CreateMilestoneDto) {
    // Verify timeline exists and user has access
    const timeline = await this.prisma.timeline.findUnique({
      where: { id: timelineId },
    });

    if (!timeline) {
      throw new NotFoundException('Timeline not found');
    }

    return this.prisma.milestone.create({
      data: {
        ...createMilestoneDto,
        date: new Date(createMilestoneDto.date),
        timelineId,
      },
    });
  }

  async findAll(timelineId: string) {
    return this.prisma.milestone.findMany({
      where: { timelineId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const milestone = await this.prisma.milestone.findUnique({
      where: { id },
    });

    if (!milestone) {
      throw new NotFoundException('Milestone not found');
    }

    return milestone;
  }

  async update(id: string, updateMilestoneDto: UpdateMilestoneDto) {
    const milestone = await this.prisma.milestone.findUnique({
      where: { id },
    });

    if (!milestone) {
      throw new NotFoundException('Milestone not found');
    }

    const updateData: any = { ...updateMilestoneDto };
    if (updateMilestoneDto.date) {
      updateData.date = new Date(updateMilestoneDto.date);
    }

    return this.prisma.milestone.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const milestone = await this.prisma.milestone.findUnique({
      where: { id },
    });

    if (!milestone) {
      throw new NotFoundException('Milestone not found');
    }

    return this.prisma.milestone.delete({
      where: { id },
    });
  }
}