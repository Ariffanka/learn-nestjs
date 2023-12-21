import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Redirect, Req, Res } from '@nestjs/common';
import { createHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Get('index')
  @HttpCode(200)
  @Header('Content-Type', 'application/json') 
  index(@Res() response) {
    response.json(this.heroService.findAll());
  }
  

  @Get('create')
  create(@Res({passthrough: true}) response):string{
    response.cookie('name',  'arip')
    return 'hero create';
  }

  @Post('store')
  store(@Req() request, @Body() hero: createHeroDto, @Res({ passthrough: true }) response): object {
    try {
      return this.heroService.create(hero);
    } catch (err) {
      response.status(500).json({ message: err });
    }
  }
  

  // @Post('store')
  // store(@Req() request, @Res({passthrough: true}) response){
  //   return{
  //     data:request.body
  //   }
  // }

  @Get('detail/:id')
  detail(@Param('id') id:number):object{
    return this.heroService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id:number, @Body() heroDto: UpdateHeroDto, @Res() response):object {
    try {
      this.heroService.update(id,heroDto);
      response.json({ message: "success" });
      return 
    } catch (err) {
      response.status(500).json({ message: err });
    }
  }

  @Get('test')
  @Redirect('https://docs.nestjs.com/')
  test(){
    return 'welcome'
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number, @Res({ passthrough: true }) response): object {
    try {
      return this.heroService.destroy(id);
    } catch (err) {
      response.status(500).json({ message: err });
    }
  }
  

}
