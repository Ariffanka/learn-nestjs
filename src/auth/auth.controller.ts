import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService,
    private jwtService:JwtService) {}

    @Post()
    login(@Body() dto: AuthDto){
        return this.authService.login(dto);
    }  
}
