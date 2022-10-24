import { PassportStrategy } from '@nestjs/passport';
import passport from 'passport';
import { Strategy } from 'passport-facebook-token';
import { PrismaService } from 'src/prisma.service';
 
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook'){
    constructor(private prisma: PrismaService) {
        super()
    }

  
    // passport.use(new FacebookTokenStrategy({
    //     clientID: "FACEBOOK_APP_ID",
    //     clientSecret: "FACEBOOK_APP_SECRET",
    //     fbGraphVersion: 'v3.0'
    //   }, function(accessToken, refreshToken, profile, done) {
    //     User.findOrCreate({facebookId: profile.id}, function (error, user) {
    //       return done(error, user);
    //     });
    //   }
    // ));
}