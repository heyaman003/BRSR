import { ConsoleLogger, Global, Module } from "@nestjs/common";

@Global()
@Module({
    providers: [ConsoleLogger],
    exports: [ConsoleLogger],
})
export class MyLogger {}