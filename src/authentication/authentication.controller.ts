import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe, 
  Req,
  UseGuards,
  Res,
 } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

  @Post('/signUp')
  @ApiCreatedResponse({
    description: 'user Registeration',
  })
  @ApiBody({ type: SignUp })
   signup(@Body(ValidationPipe) dto: SignUp) {
    return this.authenticationService.signup(dto);
  }
  @ApiBody({
    description: 'The user credentials',
  })
  @Post('signin')
  @ApiCreatedResponse({
    description: 'user signIn',
  })
  @ApiResponse({
    status: 200,
    description: 'access Token',
    type: String,
  })
  @ApiBody({ type: SignIn })
  signin(@Body(ValidationPipe) dto: SignIn) {
    return this.authenticationService.signin(dto);
  }
// <<<<<<< HEAD
//   ////////////////////////http://127.0.0.1:3000/authentication/google/callback
//   @Get('google/callback')
//   // @UseGuards(GoogleAuthGuard)
//   googleBackLogin(
//     @Body(ValidationPipe) dto: SignUp,
//   ) {
//     return this.authenticationService.callBackGoogle(
//       dto,
//     );
//   }
//   @Get('google/')
//   // @UseGuards(GoogleAuthGuard)
//   googleLogin(@Body(ValidationPipe) dto: SignUp) {
//     return this.authenticationService.callBackGoogle(
//       dto,
//     );
//   }
//   ////////////////////////////
//   @Get('facebook/callback')
//   // @UseGuards(GoogleAuthGuard)
//   facebookBackLogin(
//     @Body(ValidationPipe) dto: SignUp,
//   ) {
//     return this.authenticationService.callBackGoogle(
//       dto,
//     );
//   }
//   @Get('facebook/')
//   // @UseGuards(GoogleAuthGuard)
//   facebookLogin(
//     @Body(ValidationPipe) dto: SignUp,
//   ) {
//     return this.authenticationService.callBackGoogle(
//       dto,
//     );
//   }

//   // // api/auth/google/redirect
//   // @Get('google/redirect')
//   // @UseGuards(GoogleAuthGuard)
//   // handleRedirect() {
//   //   return { msg: 'OK' };
//   // }

//   // @Get('status')
//   // user(@Req() request: Request) {
//   //   console.log(request.user);
//   //   if (request.user) {
//   //     return { msg: 'Authenticated' };
//   //   } else {
//   //     return { msg: 'Not Authenticated' };
//   //   }
//   // }
//   // app.post(
//   //   "/auth/facebook/token",
//   //   passport.authenticate("facebook-token"),
//   //   function(req, res) {
//   //     // do something with req.user
//   //     res.send(req.user ? 200 : 401);
//   //   }
//   // );
//////////////////////////////////////////////////////////////////
  /////////////Google login
  // @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}
  @Post('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authenticationService.googleLogin(
      req,
    );
    // res.send(req.user? 200 : 401);
  }

  /////////////Facebook login
  // @UseGuards(AuthGuard('google'))
  async facebookAuth(@Req() req) {}
  @UseGuards(AuthGuard('facebook'))
  @Post('auth/facebook/callback')
  facebookAuthRedirect(@Req() req) {
    return this.authenticationService.facebookLogin(
      req,
    );
    // res.send(req.user? 200 : 401);
  }
 }
