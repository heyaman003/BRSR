import { ConsoleLogger, Global, Module } from "@nestjs/common";

@Global()
@Module({
    imports: [ConsoleLogger]
})
export class MyLogger {}