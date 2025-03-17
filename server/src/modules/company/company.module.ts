import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyController } from "src/modules/company/company.controller";
import { CompanyRepository } from "src/modules/company/company.repository";
import { Company, CompanySchema } from "./company.schema";
import { CompanyService } from "src/modules/company/company.service";
<<<<<<< HEAD
import { SectionModule } from "../section/section.module";
=======
>>>>>>> 969c5c9 (backend changes)

@Module({
    controllers: [CompanyController],
    providers: [CompanyService, CompanyRepository],
<<<<<<< HEAD
    imports: [MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}]), SectionModule],
    exports: [CompanyService]
=======
    imports: [MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}])]
>>>>>>> 969c5c9 (backend changes)
})
export class CompanyModule {}