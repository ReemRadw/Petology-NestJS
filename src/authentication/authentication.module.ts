import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, PrismaService],
  imports: [PassportModule],
})
export class AuthenticationModule {}
