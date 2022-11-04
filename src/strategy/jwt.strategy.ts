import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validate } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
       ignoreExpiration:false,      //Note:&&rate limit
       jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

       secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { id: string }) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });
    console.log('hhhhhhhh');
    delete user.password;
    return user;
  }
}
