import { IsNumber, IsEmail, IsString, IsNotEmpty } from "class-validator";

export class createHeroDto{
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    pesan:string;
}