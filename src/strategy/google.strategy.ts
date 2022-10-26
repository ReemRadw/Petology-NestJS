/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyCallback,
} from 'passport-google-token';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor() {
    super({
      clientID:
        '597158128975-57qqvamh4j11tmcnumklpaukkpnl0flv.apps.googleusercontent.com',
      clientSecret:
        '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',
      fbGraphVersion: 'v3.0',
      // callbackURL: 'http://localhost:3000/auth/facebook/dialog/oauth',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    /*const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);*/
    done(null, profile);
  }
}
