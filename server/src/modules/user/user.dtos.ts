import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsUUID, Matches } from "class-validator";
import { Company, Role } from "@prisma/client";


export enum UserRole {
    ADMIN= 'ADMIN',
    CLIENT = 'CLIENT',
    SUPERADMIN = "SUPERADMIN"
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
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