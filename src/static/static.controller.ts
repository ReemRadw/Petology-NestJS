import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaticService } from './static.service';
import { CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';

@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Get('/homepage/second-page')
  secondPage() {
    return this.staticService.secondSection();
  }  
  
  @Get('homepage/first-section')
  firstPage() {
    return this.staticService.firstSection();
  }
  @Get('homepage/footer')
  footerSection() {
    return this.staticService.footerSection();
  }
  @Get('homepage/pet-needs')
  petNeeds() {
    return this.staticService.petNeedsSection();
  }


}
