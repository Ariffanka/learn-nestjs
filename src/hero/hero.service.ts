import { Injectable } from '@nestjs/common';
import { Hero } from './entities/hero.interface';
import * as fs from 'fs-extra';
import { createHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

const dataPath = 'C:/NestJS/hi-nest/src/app/heroes/heroes.json';
const data = fs.readFileSync(dataPath, 'utf8');

@Injectable()
export class HeroService {
    private readonly heroes: Hero[] = JSON.parse(data);

    findAll() :Hero[]{
        return this.heroes;
    }

    create(newHero: createHeroDto): Hero[] {
        try {
          const { id, email, pesan } = newHero;
      
          // Check if hero with the given ID already exists
          const existingHero = this.heroes.find((hero) => hero.id === id);
          if (existingHero) {
            throw new Error('Hero with the given ID already exists');
          }
      
          // Add the new hero to the data array
          this.heroes.push({
            id,
            email,
            pesan,
          });
      
          // Write the updated data to the JSON file
          fs.writeFileSync(dataPath, JSON.stringify(this.heroes, null, 2));
      
          return this.heroes;
        } catch (err) {
          throw new Error(err);
        }
      }
      
    findOne(id:number):object{
        const data= this.heroes.filter((hero) => {
            if (hero.id== id){
              return hero.id==id;
            }
          })
          return data[0];
    }

    update(id:number, heroDto: UpdateHeroDto): object{
        this.heroes.filter((data) =>{
            if(data.id == id){
              data.email= heroDto.email;
              data.pesan= heroDto.pesan;
            }
          });
      
          fs.writeFileSync(dataPath, JSON.stringify(this.heroes, null, 2));
      
          return {
            mes:"berhasil"
          };
    }

    destroy(id:number):object{
        try {
            const index = this.heroes.findIndex((hero) => hero.id == id);
        
            if (index == -1) {
              throw new Error('Hero with the given ID not found');
            }
        
            // Menghapus data dari array berdasarkan index
            this.heroes.splice(index, 1);
        
            // Menulis data yang diperbarui ke file JSON
            fs.writeFileSync(dataPath, JSON.stringify(this.heroes, null, 2));
        
            return this.heroes;
          } catch (err) {
            throw new Error( err );
          }
    }
}
