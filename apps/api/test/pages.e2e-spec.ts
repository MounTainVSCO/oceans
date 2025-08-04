import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

describe('Pages API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId: string;
  let siteId: string;
  let siteSlug: string;
  let pageSlug: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);

    // Create a test user
    const email = `testuser-${uuid().slice(0, 8)}@example.com`;
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const user = await prisma.user.create({
      data: {
        id: uuid(),
        email,
        name: 'Test User',
        password: hashedPassword,
        isPro: false,
      },
    });
    userId = user.id;

    // Create a site for the user
    siteSlug = `test-site-${uuid().slice(0, 8)}`;
    const site = await prisma.site.create({
      data: {
        id: uuid(),
        name: 'Test Site',
        slug: siteSlug,
        userId,
        isPublic: true,
      },
    });
    siteId = site.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.page.deleteMany({ where: { siteId } });
    await prisma.site.deleteMany({ where: { id: siteId } });
    await prisma.user.deleteMany({ where: { id: userId } });
    await app.close();
  });

  it('should create a page', async () => {
    pageSlug = `test-page-${uuid().slice(0, 8)}`;
    const res = await request(app.getHttpServer())
      .post(`/sites/${siteId}/pages`)
      .send({ title: 'Test Page', slug: pageSlug })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.slug).toBe(pageSlug);
    expect(res.body.data).toHaveProperty('root');
    expect(res.body.data).toHaveProperty('content');
    expect(res.body.data).toHaveProperty('zones');
  });

  it('should get the created page', async () => {
    const res = await request(app.getHttpServer())
      .get(`/sites/${siteId}/pages/${pageSlug}`)
      .expect(200);
    expect(res.body.slug).toBe(pageSlug);
    expect(res.body.data).toHaveProperty('root');
    expect(res.body.data).toHaveProperty('content');
    expect(res.body.data).toHaveProperty('zones');
  });

  it('should update the page data', async () => {
    const newData = {
      root: { props: { title: 'Updated Title' } },
      content: [
        {
          type: 'Heading',
          props: {
            title: 'Hello',
            level: 2,
            textAlign: 'center',
            color: '#000',
            id: `Heading-${uuid()}`,
          },
        },
      ],
      zones: {},
    };
    const res = await request(app.getHttpServer())
      .put(`/sites/${siteId}/pages/${pageSlug}`)
      .send({ data: newData })
      .expect(200);
    expect(res.body.data.root.props.title).toBe('Updated Title');
    expect(res.body.data.content[0].type).toBe('Heading');
  });
});
