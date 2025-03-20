import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export class DbService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    constructor(){
        super({log: ['query']})
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async onModuleInit() {
        await this.$connect();
    }
    
}