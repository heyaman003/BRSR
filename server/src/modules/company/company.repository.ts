import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/modules/company/company.schema';
import { Model } from 'mongoose';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async listSections(companyId: string) {
    try {
      return await this.companyModel
        .findById(companyId, { sections: true })
        .populate({
          path: "sections",
          populate: {
            path: "subSections",
          }
        })
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createCompany(companyName: string, initialData: any) {
    try {
      const company = await this.companyModel.create({
        name: companyName,
        users: [],
        sections: initialData,
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
