import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
// import { FacebookStrategy } from 'src/strategy/facebook.strategy';
// import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    PrismaService,
    // JwtStrategy,
    GoogleStrategy,
    ConfigService
    // FacebookStrategy,
  ],
  imports: [PassportModule, 
    //JwtModule.register()
    // PassportModule.register({defaultStrategy: 'jwt' }),

  ],
})
export class AuthenticationModule {}
