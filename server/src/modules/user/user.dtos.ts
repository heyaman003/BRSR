import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { Company } from "../company/company.schema";
import * as mongoose from 'mongoose'


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
    @IsMongoId()
    company: string;
}


export class GetUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsNotEmpty()
    @IsMongoId()
    companyId: Company | String | string | mongoose.Schema.Types.ObjectId;
}