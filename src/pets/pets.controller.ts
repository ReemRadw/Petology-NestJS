import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Ip,
  Headers,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  ApiBody,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { request } from 'http';
import { response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@ApiTags('PetsController')
@Controller('pets')
export class PetsController {
  prisma: any;
  constructor(
    private readonly petsService: PetsService,
  ) {}

  @Post()
  create(
    @Body(ValidationPipe)
    createPetDto: CreatePetDto,
    @Req() request,
  ) {
    return this.petsService.create(
      createPetDto,
      request,
    );
  }

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
    //  createPetDto: CreatePetDto,
    @Req() request,
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petsService.update(
     + id,
      updatePetDto,
      // createPetDto,
      request,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.petsService.remove(+id);//number must have +
  }
  @Get('categories/:categoryId/pets')
  categories(
    @Body(ValidationPipe) createPetDto,
    @Param('categoryId') categoryId: string,
  ) {
    return this.petsService.categories(
      +categoryId,
    );
  }
  @ApiResponse({
    status: 201,
    description: 'Array of pets instances',
  })
  @ApiProperty({
    description: 'Array of Pet model instances',
  })
  @Get()
  getPet(@Body(ValidationPipe) createPetDto) {
    return this.petsService.getPet();
  }
}
