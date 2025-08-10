import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ComponentsModule } from './modules/components/components.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ResumeModule } from './modules/resume/resume.module';
import { TimelineModule } from './modules/timeline/timeline.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    ComponentsModule,
    AnalyticsModule,
    ResumeModule,
    TimelineModule,
  ],
})
export class AppModule {}
