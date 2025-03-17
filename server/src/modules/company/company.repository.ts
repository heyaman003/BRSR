<<<<<<< HEAD
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/modules/company/company.schema';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';

=======
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/modules/company/company.schema';
import { Model } from 'mongoose';
>>>>>>> 969c5c9 (backend changes)

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

<<<<<<< HEAD
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
=======
  async createCompany(companyName: string) {
>>>>>>> 969c5c9 (backend changes)
    try {
      const company = await this.companyModel.create({
        name: companyName,
        users: [],
<<<<<<< HEAD
        sections: initialData,
=======
>>>>>>> 969c5c9 (backend changes)
      });
      return company;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async getCompanyDetails(companyId: string): Promise<Company | null> {
    try {
<<<<<<< HEAD
      return await this.companyModel.findById(companyId).populate({path: 'users', select: {
        id: 1,
        name: 1,
        email: 1,
        createdAt: 1
      }});
=======
      return await this.companyModel.findById(companyId);
>>>>>>> 969c5c9 (backend changes)
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
<<<<<<< HEAD

  async addUser(user: User, companyId: string): Promise<void> {
    try{
    const company = await this.companyModel.findById(companyId);
    if(!company)
      throw new NotFoundException("Company not found.")

    company.users.push(user);
    await company.save();

    }catch(e){
      throw new BadRequestException(e.message)
    }
  }
=======
>>>>>>> 969c5c9 (backend changes)
}
