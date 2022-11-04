import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service'; 
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { FacebookStrategy } from 'src/strategy/facebook.strategy';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    PrismaService,
    JwtStrategy,
    GoogleStrategy,
    ConfigService,
    PrismaService,
    FacebookStrategy,
  ],
  imports: [
    PassportModule,
    JwtModule.register({}),

    // PassportModule.register({defaultStrategy: 'jwt' }),
  ],
 })
export class AuthenticationModule {}
