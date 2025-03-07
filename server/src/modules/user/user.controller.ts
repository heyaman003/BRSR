import { Body, Controller, Delete, HttpStatus, Param, Post, ValidationPipe } from "@nestjs/common";
import { CreateUserDto, UserRole } from "src/modules/user/user.dtos";
import { UserService } from "src/modules/user/user.service";
import { Role } from "src/utils/auth/roles.decorator";
import { ParseMongoIdPipe } from "src/utils/pipes/ParseMongoIdPipe";
import ResponseModel from "src/utils/ResponseModel";

@Controller("user")
export class UserController {
    constructor(private userService: UserService){}

    @Post("login")
    login(@Body(ValidationPipe) data: CreateUserDto): ResponseModel{
        this.userService.login(data)
        return new ResponseModel(200, "Ok");
    }

    @Post("create/admin")
    @Role(UserRole.ADMIN)
    async createAdmin(@Body(ValidationPipe) newAdmin: CreateUserDto): Promise<ResponseModel> {
        const newUser = await this.userService.createUser(newAdmin, UserRole.ADMIN);
        return new ResponseModel(201, "User added successfully.", newUser);
    }


    @Post("create/client")
    @Role(UserRole.ADMIN)
    async createClient(@Body(ValidationPipe) newClient: CreateUserDto): Promise<ResponseModel> {
        const newUser = await this.userService.createUser(newClient, UserRole.CLIENT);
        return new ResponseModel(201, "User added successfully.", newUser);
    }
    
    @Delete(":userId")
    @Role(UserRole.ADMIN)
    async deleteUser(@Param('userId', ParseMongoIdPipe) userId: string): Promise<ResponseModel> {
        await this.userService.deleteUser(userId);
        return new ResponseModel(HttpStatus.NO_CONTENT, "User deleted successfully.");
    }
    
}