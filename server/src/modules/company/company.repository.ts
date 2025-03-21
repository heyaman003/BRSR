import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, Company } from '@prisma/client';
import { DbService } from 'src/utils/db.connections';
import { Section } from '../section/initialData';
import { SectionService } from '../section/section.service';

@Injectable()
export class CompanyRepository {
  constructor(
    private db: DbService,
    private readonly sectionService: SectionService,
  ) {}

  async listSections(companyId: string) {
    try {
      return await this.db.company.findUnique({
        where: { id: companyId },
        select: {
          sections: {
            select: {
              id: true,
              title: true,
              subsections: true
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createCompany(companyName: string, sections: Section[]) {
    try {
      const company = await this.db.company.create({
        data: { name: companyName },
      });

      await Promise.all(
        sections.map(
          async (section) =>
            await this.sectionService.createSection(section, company.id),
        ),
      );
      return company;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async getCompanyDetails(companyId: string): Promise<Company | null> {
    try {
      return await this.db.company.findUnique({
        where: { id: companyId },
        include: {
          users: true
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async listCompanies(): Promise<Company[]> {
    try {
      return await this.db.company.findMany();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteCompany(companyId: string): Promise<void> {
    try {
      await this.db.company.delete({ where: { id: companyId } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async addUser(user: User, companyId: string): Promise<void> {
    try {
      await this.db.user.create({
        data: {
          ...user,
          companyId,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
