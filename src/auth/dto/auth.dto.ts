import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class AuthDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}