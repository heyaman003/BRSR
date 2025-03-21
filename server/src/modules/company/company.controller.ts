import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { CompanyService } from './company.service'
import ResponseModel from "src/utils/ResponseModel";
import { CompanyDto } from "src/modules/company/company.dtos";
import { Role } from "src/utils/auth/roles.decorator";
import { UserRole } from "../user/user.dtos";

@Controller('company')
export class CompanyController{
    constructor(private companyService: CompanyService){}

    @Post()
    @Role(UserRole.ADMIN)
    async createCompany(@Body() company: {name: string}):Promise<ResponseModel>{
        const companyDetails: CompanyDto = await this.companyService.createCompany(company.name);
        return new ResponseModel(201, "Company added successfully.", companyDetails);
    }

    @Get('/all')
    async listAllCompanies() {
        const companies = await this.companyService.listAllCompanies();
        return new ResponseModel(200, "Success.", companies);
    }

    @Get('/:companyId')
    async getCompanyDetails(@Param("companyId", ParseUUIDPipe) companyId: string): Promise<ResponseModel> {
        const company: CompanyDto = await this.companyService.getCompanyDetails(companyId);
        return new ResponseModel(200, "Success.", company);
    }

    @Delete('/:companyId')
    @Role(UserRole.ADMIN)
    async deleteCompany(@Param("companyId", ParseUUIDPipe) companyId: string): Promise<ResponseModel> {
        await this.companyService.deleteCompany(companyId);
        return new ResponseModel(200, "Deleted company successfully.");
    }

    @Get("/:companyId/sections")
    async listSections(@Param("companyId", ParseUUIDPipe) companyId: string):Promise<ResponseModel> {
        const sections = await this.companyService.listSections(companyId);
        return new ResponseModel(200, "Success.", sections);
    }

}