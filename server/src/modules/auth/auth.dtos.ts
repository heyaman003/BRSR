import { IsEmail } from "class-validator";

export class SiginInDto {
    @IsEmail()
    email: string;
    password: string;
}