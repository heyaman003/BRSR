import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/modules/company/company.schema';
import { Model } from 'mongoose';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async createCompany(companyName: string) {
    try {
      const company = await this.companyModel.create({
        name: companyName,
        users: [],
      });
      return company;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async getCompanyDetails(companyId: string): Promise<Company | null> {
    try {
      return await this.companyModel.findById(companyId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async listCompanies(): Promise<Company[]> {
    try {
      return await this.companyModel.find({}, { name: true });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteCompany(companyId: string): Promise<void> {
    try {
      await this.companyModel.findByIdAndDelete(companyId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
