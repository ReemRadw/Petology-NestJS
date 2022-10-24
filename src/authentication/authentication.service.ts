import {
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
//  import { InjectRepository } from '@nestjs/typeorm';
//  import { User } from '../typeorm/entities/User';
// import { UserDetails } from '../utils/types';

@Injectable() //able to call many time with same instance
export class AuthenticationService {
  constructor(private prisma: PrismaService) {} //define your DB conn

  async signup(dto: SignUp) {//validate from dto: pipes
    try {
      const { password, name, email } = dto;
      const hash = await argon.hash(password);
      const user = await this.prisma.user.create({
        //perform query to Create Record :)
           data: {//array of data
          email: email,
          password: hash,//top secret
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
      throw error;
    }
  }
  async signin(dto: SignIn) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user)
      throw new UnauthorizedException(
        'Bad Email',
      ); //if passwd doesnt match
    const pwMatch = await argon.verify(
      user.password,
      dto.password,
    ); //hashed
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
    //call jwt strategy to Retrive tokens
    const token = jwt.sign(
      { id: id },
      process.env.jwt_secret,
    );
    return token;//that's it!
  }

  callBackGoogle(id) {
    const token = 1;
    return token;
  }
  callGoogle(id) {
    const token = 1;
    return token;
  }
  callBackFacebook(id) {
    const token = 1;
    return token;
  }
  callFacebook(id) {
    const token = 1;
    return token;
  }

  ///////
  // async validateUser(details: UserDetails) {
  //   console.log('AuthService');
  //   console.log(details);
  //   const user = await this.userRepository.findOneBy({ email: details.email });
  //   console.log(user);
  //   if (user) return user;
  //   console.log('User not found. Creating...');
  //   const newUser = this.userRepository.create(details);
  //   return this.userRepository.save(newUser);
  // }

  // async findUser(id: number) {
  //   const user = await this.userRepository.findOneBy({ id });
  //   return user;
  // }
}
