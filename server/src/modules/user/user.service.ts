import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/modules/user/user.repository";
import { User } from "./user.schema";
import { CreateUserDto, GetUserDto, UserRole } from "./user.dtos";
import {hash} from 'bcryptjs'
import { CompanyService } from "../company/company.service";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository,  private readonly companyService: CompanyService){}

    login(data: any) {
       console.log(data); 
    }


    /**
     * 
     * @param userId 
     * @returns { email, name, role, company }
     */
    async getUser(userId: string): Promise<GetUserDto> {
        const user: User | null = await this.userRepository.getUserdetails(userId);

        if(!user)
            throw new NotFoundException("User not found.");

        return this.convertToDto(user);
    }

    /**
     * 
     * @param email 
     * @returns User object from MongoSchema.
     */
    async getUserdetails(email: string): Promise<User> {
        const user: User | null = await this.userRepository.getUserdetailsByEmail(email);

        if(!user)
            throw new NotFoundException("User not found.");

        return user;
    }

    async createUser(newUser: CreateUserDto, role: UserRole): Promise<GetUserDto> {
        newUser.password = await hash(newUser.password, 12);
        
        if(role===UserRole.CLIENT && !newUser.company)
            throw new BadRequestException("Please fill client's company details.")
        
        const user: User = await this.userRepository.createUser(newUser, role);

        await this.companyService.addUser(user['id'], newUser.company);

        return this.convertToDto(user)
    }

    async deleteUser(userId: string):Promise<void> {
        await this.userRepository.deleteUser(userId);
    }

    convertToDto(user: User): GetUserDto{
        return {
            name: user.name,
            email: user.email,
            role: user.role,
            companyId: user.company,
        }
    }
}