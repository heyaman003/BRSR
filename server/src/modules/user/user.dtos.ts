import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsUUID, Matches, MinLength } from "class-validator";
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

    @MinLength(8)
    @Matches(/(?=.*[a-z])/, {message: "Password must include atleast one lowercase letter."})
    @Matches(/(?=.*[A-Z])/, {message: "Password must include atleast one uppercase letter."})
    @Matches(/(?=.*\d)/, {message: "Password must include atleast one digit."})
    @Matches(/(?=.*[@$!%*?&])/, {message: "Password must include atleast one special character."})
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Password must include atleast 1 Uppercase, 1 lowercase, 1 digit and 1 special character and should be atleast 8 characters long."})
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