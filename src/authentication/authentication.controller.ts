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
  /////////////Google login
  // @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}
  @Post('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authenticationService.googleLogin(
      req,
    );
  }

  /////////////Facebook login
  // @UseGuards(AuthGuard('google'))
  async facebookAuth(@Req() req) {}
  @Post('auth/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req) {
    return this.authenticationService.facebookLogin(
      req,
    );
  }



}
