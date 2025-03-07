import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyController } from "src/modules/company/company.controller";
import { CompanyRepository } from "src/modules/company/company.repository";
import { Company, CompanySchema } from "./company.schema";
import { CompanyService } from "src/modules/company/company.service";
import { SectionModule } from "../section/section.module";

@Module({
    controllers: [CompanyController],
    providers: [CompanyService, CompanyRepository],
    imports: [MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}]), SectionModule]
})
export class CompanyModule {}