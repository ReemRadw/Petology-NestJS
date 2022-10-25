import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignIn, SignUp } from './dto';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
@ApiTags('AuthenticationController')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/signUp')
  signup(@Body(ValidationPipe) dto: SignUp) {
    return this.authenticationService.signup(dto);
  }
  @Post('signin')
  signin(@Body() dto: SignIn) {
    return this.authenticationService.signin(dto);
  }
}
