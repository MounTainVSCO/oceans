import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PagesService, PrismaService],
  controllers: [PagesController],
})
export class PagesModule {}
