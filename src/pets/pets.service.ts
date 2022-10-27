import {
  BadRequestException,
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
    // request,
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
        userId,
      } = createPetDto;

      const pet = await this.prisma.pet.create({
        data: {
          name: createPetDto.name,
          age: createPetDto.age,
          behaviour: createPetDto.behaviour,
          breed: createPetDto.breed,
          color: createPetDto.color,
          description: createPetDto.description,
          hairLength: createPetDto.hairLength,
          location: createPetDto.location,
          houseTrained: createPetDto.houseTrained,
          phone: createPetDto.phone,
          size: createPetDto.size,
          vaccinated: createPetDto.vaccinated,
          categoryId: createPetDto.categoryId,
          userId: createPetDto.userId,

          // name: 'createPetDto.name',
          // age: 'createPetDto.age',
          // behaviour: 'createPetDto.behaviour',
          // breed: 'createPetDto.breed',
          // color: 'createPetDto.color',
          // description:
          //   ' createPetDto.description',
          // hairLength: 'createPetDto.hairLength',
          // location: 'createPetDto.location',
          // houseTrained: true,
          // phone: 'createPetDto.phone',
          // size: 'createPetDto.size',
          // vaccinated: true,
          // categoryId: 1,
          // userId: '1',
        },
      });
      console.log(pet);
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
      throw BadRequestException;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.pet.delete({
        where: {
          id,
        },
      });
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
  update(
    id: number,
    // createPetDto: CreatePetDto,
    request,
    updatePetDto: CreatePetDto,
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
      } = updatePetDto;

      return this.prisma.pet.update({
        where: {
          id,
        },
        data: UpdatePetDto,
      });
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

  //   // const
  //   try {
  //     const {
  //       name,
  //       age,
  //       size,
  //       breed,
  //       hairLength,
  //       color,
  //       behaviour,
  //       houseTrained,
  //       description,
  //       location,
  //       phone,
  //       vaccinated,
  //       categoryId,
  //     } = updatePetDto;

  //     return this.prisma.pet.update({
  //       where: {
  //         id: id, //most left model /table :)
  //       },
  //       data: {
  //         name,
  //         age,
  //         behaviour,
  //         breed,
  //         color,
  //         description,
  //         hairLength,
  //         location,
  //         houseTrained,
  //         phone,
  //         size,
  //         vaccinated,
  //         categoryId,
  //         userId: request.user.id,
  //       },
  //     });
  //     // return pet;
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
  //     throw error;
  //   }
  // }
  findOne(arg0: number) {
    return this.prisma.pet.findFirst({
      where: {
        id: arg0, //most left model /table :)
      },
    });
  }
  findAll() {
    return this.prisma.pet.findMany({});
    // return 'test';
  }
  getPet() {
    return this.prisma.pet.findMany();
  }
}
