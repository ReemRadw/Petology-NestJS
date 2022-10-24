
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import passport from 'passport';
import {Strategy} from 'passport-token-google';
import { PrismaService } from 'src/prisma.service';

 
 @Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(private prisma: PrismaService) {
        super()
    }
    async validate(payload: { sub: number; email: string }) {
        const user = await this.prisma.user.findUnique({
          where: {
            id: payload.sub,
          },
        });
        delete user.password;
        return user;
      }
  
//     passport.use(new Strategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     },
//   function(idToken, refreshToken, profile, done) {
//     fetchGoogleUser(profile, idToken)
//       .then((user) => done(null, user))
//       .catch((err) => {
//         // Handle the error
//         done(null, {})
//       });
  }