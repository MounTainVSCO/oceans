import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async create(siteId: string, title: string, slug: string) {
    const initialData = {
      root: { props: { title } },
      content: [],
      zones: {},
    };
    return this.prisma.page.create({
      data: {
        id: uuid(),
        siteId,
        slug,
        title,
        data: initialData,
      },
    });
  }

  async findOne(siteId: string, slug: string) {
    return this.prisma.page.findUnique({
      where: { siteId_slug: { siteId, slug } },
    });
  }

  async update(siteId: string, slug: string, data: any) {
    return this.prisma.page.update({
      where: { siteId_slug: { siteId, slug } },
      data: { data },
    });
  }
}
