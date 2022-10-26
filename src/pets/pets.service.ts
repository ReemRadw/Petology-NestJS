import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  categories(categoryId: number) {
    return this.prisma.pet.findMany({
      where: {
        categoryId: { equals: categoryId },
      },
    });
  }
  // create(createPetDto: CreatePetDto) {
  //   try {
  //     const   {name,age,size,breed,hairLength,color,behaviour,houseTrained,description,location,phone,vaccinated,categoryId} = createPetDto;

  //     const pet =  this.prisma.pet.create({
  //       data : {
  //        name,
  //        age,
  //        behaviour,
  //        breed,
  //        color,
  //        description,
  //        hairLength,
  //        location,
  //        houseTrained,
  //        phone,
  //        size,
  //        vaccinated,
  //        categoryId,
  //       }
  //       })
  //    }
  // }catch (error) {
  //          if (
  //            error instanceof
  //            PrismaClientKnownRequestError
  //          ) {
  //            if (error.code === 'P2002') {
  //              throw new ConflictException(
  //                'Credentials Taken',
  //              );
  //            }
  //          }
  //          throw error;
  //        }

  remove(arg0: number): void {
    throw new Error('Method not implemented.');
  }
  update(
    arg0: number,
    updatePetDto: UpdatePetDto,
  ) {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
}
