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
  async create(
    createPetDto: CreatePetDto,
    request,
  ) {
    try {
      const {
        name,
        age,
        size,
        breed,
        hairLength,
        color,
        behaviour,
        houseTrained,
        description,
        location,
        phone,
        vaccinated,
        categoryId,
      } = createPetDto;

      const pet = await this.prisma.pet.create({
        data: {
          name,
          age,
          behaviour,
          breed,
          color,
          description,
          hairLength,
          location,
          houseTrained,
          phone,
          size,
          vaccinated,
          categoryId,
          userId: request.user.id,
        },
      });
      return pet;
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
  async remove(Id: number) {
    return this.prisma.pet.delete({
      where: {
        id : Id ,//most left model /table :)
      },
    });  }
  update(
    id : number,
    // createPetDto: CreatePetDto,
    request,
    updatePetDto: UpdatePetDto,
  ) {
    // const 
    try {
      const {
        name,
        age,
        size,
        breed,
        hairLength,
        color,
        behaviour,
        houseTrained,
        description,
        location,
        phone,
        vaccinated,
        categoryId,
      } = updatePetDto;
 
    //////////
    return this.prisma.pet.update({
      where: {
        id : id ,//most left model /table :)
      },data :{
        name,
        age,
        behaviour,
        breed,
        color,
        description,
        hairLength,
        location,
        houseTrained,
        phone,
        size,
        vaccinated,
        categoryId,
        userId: request.user.id,
      }
    }); 
    // return pet;
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
  findOne(arg0: number) {
    return this.prisma.pet.findFirst({
      where: {
        id : arg0 ,//most left model /table :)
      },
    });   }
  findAll() {
    return this.prisma.pet.findMany({
     
    });   }
  getPet() {
    return this.prisma.pet.findMany();
  }
}
