import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { SitesModule } from './modules/sites/sites.module';
import { PagesModule } from './modules/pages/pages.module';
import { ComponentsModule } from './modules/components/components.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ResumeModule } from './modules/resume/resume.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    SitesModule,
    PagesModule,
    ComponentsModule,
    AnalyticsModule,
    ResumeModule,
  ],
})
export class AppModule {}
