import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "src/modules/user/user.controller";
import { UserRepository } from "src/modules/user/user.repository";
import { User, UserSchema } from "src/modules/user/user.schema";
import { UserService } from "src/modules/user/user.service";
<<<<<<< HEAD
import { CompanyModule } from "../company/company.module";
=======
>>>>>>> 969c5c9 (backend changes)


@Module({
    providers:[UserService, UserRepository],
    controllers: [UserController],
<<<<<<< HEAD
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), CompanyModule],
=======
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
>>>>>>> 969c5c9 (backend changes)
    exports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), UserService]
})
export class UserModule{}