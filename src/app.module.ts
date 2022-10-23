import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaService } from './prisma.service';
import { StaticModule } from './static/static.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthenticationModule, StaticModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
