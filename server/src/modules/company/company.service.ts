import { Injectable, NotFoundException } from "@nestjs/common";
import { CompanyDto } from "src/modules/company/company.dtos";
import { CompanyRepository } from "src/modules/company/company.repository";
import { Company } from "./company.schema";

@Injectable()
export class CompanyService {
    constructor(private readonly companyRepository: CompanyRepository){}

    async createCompany(companyName: string): Promise<CompanyDto> {
        const newCompany = await this.companyRepository.createCompany(companyName);
        return this.convertToDto(newCompany);
    }

    async getCompanyDetails(companyId: string): Promise<CompanyDto> {
        const company: Company | null = await this.companyRepository.getCompanyDetails(companyId);

        if(!company)
            throw new NotFoundException("Company not found");

        return this.convertToDto(company);
    }

    async listAllCompanies(): Promise<any[]> {
        const allCompanies: Company[] = await this.companyRepository.listCompanies();
        return allCompanies.map(company=>({ id: company['id'], name: company.name,}))
    }

    async deleteCompany(companyId: string): Promise<void> {
        await this.companyRepository.deleteCompany(companyId);
    }

    convertToDto(company: Company): CompanyDto {
        return {
            id: company['id'],
            name: company.name,
            users: company.users,
            createdAt: company['createdAt'],
            updatedAt: company['updatedAt']
        }
    }
}