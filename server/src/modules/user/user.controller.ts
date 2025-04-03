import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Req, UnauthorizedException, ValidationPipe } from "@nestjs/common";
import { CreateUserDto, UserRole } from "src/modules/user/user.dtos";
import { UserService } from "src/modules/user/user.service";
import { Role } from "src/utils/auth/roles.decorator";
import ResponseModel from "src/utils/ResponseModel";

@Controller("user")
export class UserController {
    constructor(private userService: UserService){}

    @Post("login")
    login(@Body(ValidationPipe) data: CreateUserDto): ResponseModel{
        this.userService.login(data)
        return new ResponseModel(200, "Ok");
    }

    @Post("create")
    @Role(UserRole.ADMIN)
    async createUser(@Body(ValidationPipe) userdetails: CreateUserDto, @Req() request: Request): Promise<ResponseModel> {
        const userRole = request['user']['role'];
        // If the current user is an ADMIN then he is not allowed to create a ADMIN or SUPERADMIN
        if(userRole==='ADMIN' && (userdetails?.role===UserRole.ADMIN || userdetails?.role===UserRole.SUPERADMIN))
            throw new UnauthorizedException('You are not authorized to perform this task.')

        const newUser = await this.userService.createUser(userdetails, userdetails.role);
        return new ResponseModel(201, "User added successfully.", newUser);
    }

    @Post("create/admin")
    @Role(UserRole.SUPERADMIN)
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
    async deleteUser(@Param('userId', ParseUUIDPipe) userId: string, @Req() request: Request): Promise<ResponseModel> {
        const role = request['user']['role']
        await this.userService.deleteUser(userId, role);
        return new ResponseModel(HttpStatus.NO_CONTENT, "User deleted successfully.");
    }

    @Get("/mentions")
    async getMentions(@Req() request: Request): Promise<ResponseModel> {
        const userId: string = request['user']['sub'];
        const mentions = await this.userService.getMentions(userId);
        return new ResponseModel(HttpStatus.OK, "Success", mentions);
    }
    
}