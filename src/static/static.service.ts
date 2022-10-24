import { Injectable } from '@nestjs/common';
import { CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';

@Injectable()
export class StaticService {
  secondSection() {
    return {
      title: 'About Petology',
      body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.',
    };
  } 
  firstSection() {
    return {
      title: 'Not only people need a house',
      body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. ',
    };
  }

  footerSection() {
    return {
      "email": "Email@petology.com",
      "location": "First settlement/Cairo",
      "phone": "(+2)0123456789",
      "location2": "Cairo/Egypt"
    };
    
  }
  petNeedsSection() {
    return[
      {
        "imageUrl": "https://petology.orangedigitalcenteregypt.com/assets/Bowls and Cups.png",
        "title": "Bowls and Cups"
      },
      {
        "imageUrl": "https://petology.orangedigitalcenteregypt.com/assets/Pet Food.png",
        "title": "Pet Food"
      },
      {
        "imageUrl": "https://petology.orangedigitalcenteregypt.com/assets/Inoculation.png",
        "title": "Inoculation"
      },
      {
        "imageUrl": "https://petology.orangedigitalcenteregypt.com/assets/Sleeping Areas.png",
        "title": "Sleeping Areas"
      },
      {
        "imageUrl": "https://petology.orangedigitalcenteregypt.com/assets/Toys.png",
        "title": "Toys"
      },
      {
        "imageUrl": "https://petology.orangedigitalcenteregypt.com/assets/Transportation.png",
        "title": "Transportation"
      },
      {
        "imageUrl": "https://petology.orangedigitalcenteregypt.com/assets/Vitamins.png",
        "title": "Vitamins"
      }
    ];
    
  }

  
}
