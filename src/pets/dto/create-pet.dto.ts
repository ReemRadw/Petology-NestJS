import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  isNotEmpty,
  Min,
} from 'class-validator';

export class CreatePetDto {
  @ApiProperty({
    description: 'Pet properties',
  })
  @ApiProperty({
    type: String,
    description: 'name',
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    type: String,
    description: 'age',
  })
  @IsInt()
  age: string;
  @ApiProperty({
    type: String,
    description: 'size',
  })
  @IsNotEmpty()
  size: string;
  @ApiProperty({
    type: String,
    description: 'breed',
  })
  @IsNotEmpty()
  breed: string;
  @ApiProperty({
    type: String,
    description: 'hairLength',
  })
  @IsNotEmpty()
  hairLength: string;
  @ApiProperty({
    type: String,
    description: 'color',
  })
  @IsNotEmpty()
  color: string;
  @ApiProperty({
    type: String,
    description: 'behaviour',
  })
  @IsNotEmpty()
  behaviour: string;
  @ApiProperty({
    type: String,
    description: 'houseTrained',
  })
  @IsBoolean()
  houseTrained: boolean;
  @ApiProperty({
    type: String,
    description: 'description',
  })
  @IsNotEmpty()
  description: string;
  @ApiProperty({
    type: String,
    description: 'location',
  })
  @IsNotEmpty()
  location: string;
  @ApiProperty({
    type: String,
    description: 'phone',
  })
  @IsNotEmpty()
  phone: string;
  @ApiProperty({
    type: String,
    description: 'vaccinated',
  })
  @IsBoolean()
  vaccinated: boolean;
  @ApiProperty({
    type: String,
    description: 'number',
  })
  @IsNotEmpty()
  categoryId: number;
}
