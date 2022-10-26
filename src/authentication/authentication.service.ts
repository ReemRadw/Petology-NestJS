import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import * as argon from 'argon2';
import { SignIn, SignUp } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignUp) {
    try {
      const { password, name, email } = dto;
      const hash = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hash,
          name: name,
        },
      });
      const accessToken = this.signToken(user.id);
      return {
        accessToken,
      };
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Credentials Taken',
          );
        }
      }
      throw new BadRequestException();
    }
  }

  async signin(dto: SignIn) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!dto.email) {
      throw new UnauthorizedException(
        'please enter email',
      );
    }
    if (!dto.password) {
      throw new UnauthorizedException(
        'please enter password',
      );
    }

    if (!user)
      throw new UnauthorizedException(
        'Bad Email',
      );
    const pwMatch = await argon.verify(
      user.password,
      dto.password,
    );
    if (!pwMatch)
      throw new UnauthorizedException(
        'Bad Password',
      );
    const accessToken = this.signToken(user.id);
    return {
      accessToken,
    };
  }
  signToken(id) {
    const token = jwt.sign(
      { id: id },
      process.env.jwt_secret,
    );
    return token;
  }
  //////////////Google
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}
