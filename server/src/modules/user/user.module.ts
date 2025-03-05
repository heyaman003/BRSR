import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "src/modules/user/user.controller";
import { UserRepository } from "src/modules/user/user.repository";
import { User, UserSchema } from "src/modules/user/user.schema";
import { UserService } from "src/modules/user/user.service";


@Module({
    providers:[UserService, UserRepository],
    controllers: [UserController],
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    exports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), UserService]
})
export class UserModule{}