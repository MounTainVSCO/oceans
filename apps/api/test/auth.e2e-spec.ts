import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

describe('Authentication (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const testUser = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123',
  };

  const testUser2 = {
    email: 'test2@example.com',
    name: 'Test User 2',
    password: 'password123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    // Clean up test data before each test
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [testUser.email, testUser2.email],
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [testUser.email, testUser2.email],
        },
      },
    });
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201)
        .expect((res: any) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toBe(testUser.email);
          expect(res.body.user.name).toBe(testUser.name);
          expect(res.body.user.isPro).toBe(false);
          expect(res.body.user).toHaveProperty('id');
        });
    });

    it('should fail to register with invalid email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          ...testUser,
          email: 'invalid-email',
        })
        .expect(400);
    });

    it('should fail to register with short password', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          ...testUser,
          password: '123',
        })
        .expect(400);
    });

    it('should fail to register with short name', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          ...testUser,
          name: 'A',
        })
        .expect(400);
    });

    it('should fail to register duplicate user', async () => {
      // First registration
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      // Second registration with same email
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(409);
    });
  });

  describe('/auth/login (POST)', () => {
    beforeEach(async () => {
      // Register a user for login tests
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);
    });

    it('should login successfully with correct credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect((res: any) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toBe(testUser.email);
          expect(res.body.user.name).toBe(testUser.name);
        });
    });

    it('should fail to login with incorrect email', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'wrong@example.com',
          password: testUser.password,
        })
        .expect(401);
    });

    it('should fail to login with incorrect password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(401);
    });

    it('should fail to login with invalid email format', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid-email',
          password: testUser.password,
        })
        .expect(400);
    });
  });

  describe('/auth/refresh (POST)', () => {
    let refreshToken: string;

    beforeEach(async () => {
      // Register and login to get refresh token
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);
      refreshToken = response.body.refreshToken;
    });

    it('should refresh token successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken })
        .expect(200)
        .expect((res: any) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toBe(testUser.email);
        });
    });

    it('should fail to refresh with invalid token', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: 'invalid-token' })
        .expect(401);
    });

    it('should fail to refresh without token', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({})
        .expect(400);
    });
  });

  describe('/auth/profile (GET)', () => {
    let accessToken: string;

    beforeEach(async () => {
      // Register and login to get access token
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);
      accessToken = response.body.accessToken;
    });

    it('should get profile successfully with valid token', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res: any) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('email');
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('isPro');
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
          expect(res.body.email).toBe(testUser.email);
          expect(res.body.name).toBe(testUser.name);
        });
    });

    it('should fail to get profile without token', () => {
      return request(app.getHttpServer()).get('/auth/profile').expect(401);
    });

    it('should fail to get profile with invalid token', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  describe('/auth/profile (PUT)', () => {
    let accessToken: string;

    beforeEach(async () => {
      // Clean up any existing test data
      await prisma.user.deleteMany({
        where: {
          email: {
            in: [
              testUser.email,
              testUser2.email,
              'updated-profile@example.com',
            ],
          },
        },
      });

      // Register and login to get access token
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);
      accessToken = response.body.accessToken;
    });

    it('should update profile successfully', () => {
      const updateData = {
        name: 'Updated Name',
        email: `updated-profile-test-${uuid()}@example.com`,
      };

      return request(app.getHttpServer())
        .put('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(200)
        .expect((res: any) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.name).toBe(updateData.name);
          expect(res.body.user.email).toBe(updateData.email);
        });
    });

    it('should update only name when only name is provided', () => {
      const updateData = {
        name: 'Updated Name Only',
      };

      return request(app.getHttpServer())
        .put('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(200)
        .expect((res: any) => {
          expect(res.body.user.name).toBe(updateData.name);
          expect(res.body.user.email).toBe(testUser.email); // Should remain unchanged
        });
    });

    it('should fail to update profile with invalid email', () => {
      return request(app.getHttpServer())
        .put('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ email: 'invalid-email' })
        .expect(400);
    });

    it('should fail to update profile with short name', () => {
      return request(app.getHttpServer())
        .put('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'A' })
        .expect(400);
    });

    it('should fail to update profile without token', () => {
      return request(app.getHttpServer())
        .put('/auth/profile')
        .send({ name: 'Updated Name' })
        .expect(401);
    });

    it('should fail to update profile with duplicate email', async () => {
      // Register second user
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser2)
        .expect(201);

      // Try to update first user's email to second user's email
      return request(app.getHttpServer())
        .put('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ email: testUser2.email })
        .expect(409);
    });
  });

  describe('/auth/change-password (PUT)', () => {
    let accessToken: string;

    beforeEach(async () => {
      // Register and login to get access token
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);
      accessToken = response.body.accessToken;
    });

    it('should change password successfully', () => {
      const changePasswordData = {
        currentPassword: testUser.password,
        newPassword: 'newpassword123',
      };

      return request(app.getHttpServer())
        .put('/auth/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(changePasswordData)
        .expect(200);
    });

    it('should fail to change password with incorrect current password', () => {
      const changePasswordData = {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword123',
      };

      return request(app.getHttpServer())
        .put('/auth/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(changePasswordData)
        .expect(400);
    });

    it('should fail to change password with short new password', () => {
      const changePasswordData = {
        currentPassword: testUser.password,
        newPassword: '123',
      };

      return request(app.getHttpServer())
        .put('/auth/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(changePasswordData)
        .expect(400);
    });

    it('should fail to change password without token', () => {
      const changePasswordData = {
        currentPassword: testUser.password,
        newPassword: 'newpassword123',
      };

      return request(app.getHttpServer())
        .put('/auth/change-password')
        .send(changePasswordData)
        .expect(401);
    });

    it('should fail to change password with invalid current password format', () => {
      const changePasswordData = {
        currentPassword: '123',
        newPassword: 'newpassword123',
      };

      return request(app.getHttpServer())
        .put('/auth/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(changePasswordData)
        .expect(400);
    });
  });

  describe('Integration Tests', () => {
    it('should complete full auth flow: register -> login -> get profile -> update profile -> change password', async () => {
      // 1. Register
      const registerResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      const { accessToken, refreshToken, user } = registerResponse.body;

      // 2. Login
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(loginResponse.body.user.id).toBe(user.id);

      // 3. Get Profile
      const profileResponse = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(profileResponse.body.id).toBe(user.id);

      // 4. Update Profile
      const updateResponse = await request(app.getHttpServer())
        .put('/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Updated Name' })
        .expect(200);

      expect(updateResponse.body.user.name).toBe('Updated Name');

      // 5. Change Password
      await request(app.getHttpServer())
        .put('/auth/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          currentPassword: testUser.password,
          newPassword: 'newpassword123',
        })
        .expect(200);

      // 6. Verify new password works
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'newpassword123',
        })
        .expect(200);

      // 7. Verify old password doesn't work
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(401);
    });
  });
});
