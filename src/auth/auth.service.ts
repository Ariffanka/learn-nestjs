import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtServie: JwtService){}

    async login(dto:AuthDto){
        const user= await this.userService.findByEmail(dto.email);
        if(user && (await compare(dto.password, user.password))){
            const {password, ...result} = user;
            const payload= {sub: user.id, username: user.email};
            return{
                ...result,
                acces_token: await this.jwtServie.signAsync(payload, {
                    secret: `ini ${password}`,
                    expiresIn: '60s',
                }),
            };
        }

        throw new UnauthorizedException();
    }
}