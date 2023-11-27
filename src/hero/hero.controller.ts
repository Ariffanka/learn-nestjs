import { Body, Controller, Get, Header, HttpCode, Param, Post, Put, Redirect, Req, Res } from '@nestjs/common';
import { createHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
// import { response } from 'express';
// import { response } from 'express';
// import { response } from 'express';
// import { request } from 'http';
const datas=
[
  {
    id: 1,
    email: 'test@gmail.com',
    pesan: 'test',
  },
  {
    id: 2,
    email: 'testing@gmail.com',
    pesan: 'testing',
  },
  {
    id: 3,
    email: 'coba@gmail.com',
    pesan: 'coba',
  },
];


@Controller('hero')
export class HeroController {
  @Get('index')
  @HttpCode(200)
  @Header('Content-Type', 'application/json') 
  index(@Res() response) {
    response.json(datas);
  }
  

  @Get('create')
  create(@Res({passthrough: true}) response):string{
    response.cookie('name',  'arip')
    return 'hero create';
  }

  @Post('store')
  store(@Req() request, @Body() hero: createHeroDto, @Res({passthrough: true}) response):object{
    try{
      const {id, email, pesan} = request.body;
      datas.push({
        id,
        email,
        pesan
      });
      return hero;
    } catch(err){
      response.status(500).json({message: err});
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

    const data= datas.filter((hero) => {
      if (hero.id== id){
        return hero.id==id;
      }
    })
    return data[0];
  }

  @Put('update/:id')
  update(@Param('id') id:number, @Body() heroDto: UpdateHeroDto):object {
    datas.filter((data) =>{
      if(data.id == id){
        data.email= heroDto.email;
        data.pesan= heroDto.pesan;
      }
    });

    return datas;
  }

  @Get('test')
  @Redirect('https://docs.nestjs.com/')
  test(){
    return 'welcome'
  }


}
