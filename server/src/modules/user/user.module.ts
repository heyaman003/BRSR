import { Module } from "@nestjs/common";
import { UserController } from "src/modules/user/user.controller";
import { UserRepository } from "src/modules/user/user.repository";
import { UserService } from "src/modules/user/user.service";
import { DbModule } from "src/utils/db.connection.module";


@Module({
    providers:[ UserService, UserRepository ],
    controllers: [ UserController ],
    imports: [ DbModule ],
    exports: [ UserService ]
})
export class UserModule{}