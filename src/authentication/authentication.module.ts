import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
// import { SessionSerializer } from './utils/Serializer';
 // import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../typeorm/entities/User';
@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, PrismaService,
    //  GoogleStrategy,
    // SessionSerializer,
    // {
    //   provide: 'AUTH_SERVICE',
    //   useClass: AuthService,
    // },
  ],
  imports: [PassportModule],
})
export class AuthenticationModule {}
