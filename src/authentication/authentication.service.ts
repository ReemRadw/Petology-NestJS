import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Req,
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

  async signup(dto: SignUp) {
    //validate from dto: pipes
    try {
      const { password, name, email } = dto;
      const hash = await argon.hash(password);
      const user = await this.prisma.user.create({
        //perform query to Create Record :)
        data: {
          //array of data
          email: email,
          password: hash, //top secret
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
// <<<<<<< HEAD
//   async signin(dto: SignIn) {
//     const user =
//       await this.prisma.user.findUnique({
//         where: {
//           email: dto.email,
//         },
//       });

//     if (!user)
//       throw new UnauthorizedException(
//         'Bad Email',
//       ); //if passwd doesnt match
//     const pwMatch = await argon.verify(
//       user.password,
//       dto.password,
//     ); //hashed
// =======
  // async signup(dto: SignUp) {
  //   try {
  //     const { password, name, email } = dto;
  //     const hash = await argon.hash(password);
  //     const user = await this.prisma.user.create({
  //       data: {
  //         email: email,
  //         password: hash,
  //         name: name,
  //       },
  //     });

  //     const accessToken = this.signToken(user.id);
  //     console.log(accessToken);
  //     return {
  //       accessToken,
  //     };
  //   } catch (error) {
  //     if (
  //       error instanceof
  //       PrismaClientKnownRequestError
  //     ) {
  //       if (error.code === 'P2002') {
  //         throw new ConflictException(
  //           'Credentials Taken',
  //         );
  //       }
  //     }
  //     throw new BadRequestException();
  //   }
  // }

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
     //call jwt strategy to Retrive tokens
      const token = jwt.sign(
      { id: id },
      process.env.jwt_secret,
    );
//      return token; //that's it!
//   }

//   callBackGoogle(@Req() req) {
//     //call the lib
    
//     //check if it's already user (DB:query) >>>> loged him In >>redirect to home
    
    
//     //else create new user  
    
//   }
//   callGoogle(req) {
//     const token = 1;
//     return token;
//   }
//   callBackFacebook(id) {
   
// // {
// //   status: 'connected',
// //   authResponse: {
// //       accessToken: '...',
// //       expiresIn:'...',
// //       signedRequest:'...',
// //       userID:'...'
// //   }
// // }
//   }
//   callFacebook(id) {
//     const token = 1;
//     return token;
//   }

//   ///////
//   // async validateUser(details: UserDetails) {
//   //   console.log('AuthService');
//   //   console.log(details);
//   //   const user = await this.userRepository.findOneBy({ email: details.email });
//   //   console.log(user);
//   //   if (user) return user;
//   //   console.log('User not found. Creating...');
//   //   const newUser = this.userRepository.create(details);
//   //   return this.userRepository.save(newUser);
//   // }

//   // async findUser(id: number) {
//   //   const user = await this.userRepository.findOneBy({ id });
//   //   return user;
//   // }
/////////////////////////////////////////
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

  //////////////Facebook
  facebookLogin(req) {
    // do something with req.user
    // res.send(req.user? 200 : 401);
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
 }
