 
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
    super(
      {
        authorizationURL:
          'http://127.0.0.1:3000/authentication/',
        tokenURL:
          // AccessToken.getCurrentAccessToken(),
          'http://127.0.0.1:3000/authentication/auth/facebook/callback',
        clientID: '780800109664245',
        clientSecret:
          '4af41cbdabf0b7683e9cec108d0cac9f', //check again
        fbGraphVersion: 'v3.0',
      },
      function (
        accessToken,
        refreshToken,
        profile,
        done,
      ) {
        this.prisma.findOrCreate(
          { facebookId: profile.id },
          function (error, user) {
            return done(error, user);
          },
        );
      },
    );
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    done(null, profile);
  }
}
 