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
  // categories(categoryId: number) {
  //   return this.prisma.pet.findMany({
  //    where: { categoryId: categoryId }
  //   }

  // }

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
  create(createPetDto: CreatePetDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly prisma: PrismaService,
  ) {}
}
