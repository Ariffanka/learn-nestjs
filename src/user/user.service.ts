import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import {hash} from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async register(dto: CreateUserDto) {

  const cekEmail= await this.findByEmail(dto.email);
  if(cekEmail){
    throw new ConflictException('email dah ada');
  }
   const newUser= await this.prisma.user.create({
      data:{
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
    const {password, ...user}= newUser;
    // password;
    return user;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email:string){
    const user= await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: number) {
    
    const user= await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if(user){
      return user;
    }

    throw new NotFoundException('data user gk ada');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
