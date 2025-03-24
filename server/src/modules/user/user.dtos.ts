import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsUUID, Matches } from "class-validator";
import { Company, Role } from "@prisma/client";
import { Transform } from "class-transformer";


export enum UserRole {
    ADMIN= 'ADMIN',
    CLIENT = 'CLIENT',
    SUPERADMIN = "SUPERADMIN"
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @Transform(({value}:{value: string})=>value.toLowerCase())
    email: string;

    @IsNotEmpty()
    name: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    company: string;
}


export class GetUserDto {
    @IsUUID()
    @Transform(({value}:{value: string})=>value.toLowerCase())
    id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsEnum(Role)
    role: Role;

    @IsNotEmpty()
    @IsUUID()
    companyId: Company | string;
}