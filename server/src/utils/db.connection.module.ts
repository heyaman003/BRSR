import { Module } from "@nestjs/common";
import { DbService } from "./db.connections";

@Module({
    providers: [DbService],
    exports: [DbService]
})
export class DbModule {}