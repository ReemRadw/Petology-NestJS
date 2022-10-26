import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PetsController')
@Controller('pets')
export class PetsController {
  prisma: any;
  constructor(
    private readonly petsService: PetsService,
  ) {}

  // @Post()
  // create(@Body() createPetDto: CreatePetDto) {
  //   return this.petsService.create(createPetDto);
  // }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petsService.update(
      +id,
      updatePetDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
  @Get('categories/:categoryId/pets')
  categories(
    @Param('categoryId') categoryId: number,
  ) {
    return this.petsService.categories(
      +categoryId,
    );
  }
}
