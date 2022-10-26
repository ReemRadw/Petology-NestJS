/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyCallback,
} from 'passport-google-token';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { randomUUID } from 'crypto';
import * as argon from 'argon2';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super(
      {
        clientID:
          '597158128975-57qqvamh4j11tmcnumklpaukkpnl0flv.apps.googleusercontent.com',
        clientSecret:
          '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',
        fbGraphVersion: 'v3.0',
        // callbackURL: 'http://localhost:3000/auth/facebook/dialog/oauth',
        scope: ['email', 'profile'],
      },
      // ,function (
      //   accessToken,
      //   refreshToken,
      //   profile,
      //   done,
      // ) {
      //   this.prisma.findOrCreate(
      //     { googleId: profile.id },
      //     function (error, user) {
      //       return done(error, user);
      //     },
      //   );
      // },
    );
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    //  ///////////////////////////////
    const { id, name, emails, photos, _json } =
      profile;

    const hash = await argon.hash(
      randomUUID() + ' ' + id,
    ); //combination
    const User = await this.prisma.user.create({
      data: {
        name:
          name.givenName + ' ' + name.familyName,
        email: emails[0].value,
        password: hash,
        googleId: id,
        picture: _json.picture,
        // createdAt: this.now
      },
    });

    done(null, profile);
  }
}
