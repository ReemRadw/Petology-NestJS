import {
  ApiBody,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class SignUp {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'name',
  })
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;
}

export class SignIn {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;
}
