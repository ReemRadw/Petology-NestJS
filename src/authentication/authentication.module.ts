import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    PrismaService,
    JwtStrategy,
  ],
  imports: [PassportModule],
})
export class AuthenticationModule {}
