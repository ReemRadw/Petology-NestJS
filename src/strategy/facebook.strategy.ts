/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyCallback,
} from 'passport-facebook-token';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor() {
    super({
      clientID:
        '6a7c836138e547111b961abeb520782b',
      clientSecret: '#', //check again
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
