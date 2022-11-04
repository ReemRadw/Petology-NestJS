import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignIn, SignUp } from './dto';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
 import { GoogleStrategy } from 'passport-token-google';
 @ApiTags('AuthenticationController')

 @Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('signUp')
  signup(@Body(ValidationPipe) dto: SignUp) {
    return this.authenticationService.signup(dto);
  }
  @Post('signin')
  signin(@Body() dto: SignIn) {
    return this.authenticationService.signin(dto);
  }
  ////////////////////////http://127.0.0.1:3000/authentication/google/callback
  @Get('google/callback')
  // @UseGuards(GoogleAuthGuard)
  googleBackLogin(
    @Body(ValidationPipe) dto: SignUp,
  ) {
    return this.authenticationService.callBackGoogle(
      dto,
    );
  }
  @Get('google/')
  // @UseGuards(GoogleAuthGuard)
  googleLogin(@Body(ValidationPipe) dto: SignUp) {
    return this.authenticationService.callBackGoogle(
      dto,
    );
  }
  ////////////////////////////
  @Get('facebook/callback')
  // @UseGuards(GoogleAuthGuard)
  facebookBackLogin(
    @Body(ValidationPipe) dto: SignUp,
  ) {
    return this.authenticationService.callBackGoogle(
      dto,
    );
  }
  @Get('facebook/')
  // @UseGuards(GoogleAuthGuard)
  facebookLogin(
    @Body(ValidationPipe) dto: SignUp,
  ) {
    return this.authenticationService.callBackGoogle(
      dto,
    );
  }

  // // api/auth/google/redirect
  // @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  // handleRedirect() {
  //   return { msg: 'OK' };
  // }

  // @Get('status')
  // user(@Req() request: Request) {
  //   console.log(request.user);
  //   if (request.user) {
  //     return { msg: 'Authenticated' };
  //   } else {
  //     return { msg: 'Not Authenticated' };
  //   }
  // }
  // app.post(
  //   "/auth/facebook/token",
  //   passport.authenticate("facebook-token"),
  //   function(req, res) {
  //     // do something with req.user
  //     res.send(req.user ? 200 : 401);
  //   }
  // );
}
