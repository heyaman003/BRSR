import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
            orderBy: {
              title: 'asc',
            },
            select: {
              id: true,
              title: true,
              subsections: {
                orderBy: {
                  title: 'asc',
                },
                select: {
                  title: true,
                  id: true,
                  _count: {
                    select: {
                      questions: {
                        where: {
                          isAnswered: true,
                        },
                      },
                    },
                  },
                  questions: {
                    select: {
                      id: true,
                      desc: true,
                      index: true,
                      isAnswered: true,
                    },
                  },
                },
              },
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
          users: true,
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
      console.log(e)
      throw new InternalServerErrorException();
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

  private async getTotalQuestionsCount(companyId: string) {
    const totalQuestions = await this.db.company.findUnique({
      where: { id: companyId },
      select: {
        sections: {
          select: {
            subsections: {
              select: {
                _count: {
                  select: {
                    questions: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    let total: number = 0;

    totalQuestions?.sections.forEach((section) =>
      section.subsections.forEach(
        (subsection) => (total += subsection._count.questions),
      ),
    );

    return total;
  }

  async getQuestionStats(
    companyId: string,
  ): Promise<{ total: number; answered: number }> {
    try {
      return {
        total: await this.getTotalQuestionsCount(companyId),
        answered: await this.getTotalAnsweredQuestionsCount(companyId),
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException();
    }
  }

  private async getTotalAnsweredQuestionsCount(companyId: string) {
    const totalQuestions = await this.db.company.findUnique({
      where: { id: companyId },
      select: {
        sections: {
          select: {
            subsections: {
              select: {
                _count: {
                  select: {
                    questions: {
                      where: {
                        isAnswered: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    let total: number = 0;

    totalQuestions?.sections.forEach((section) =>
      section.subsections.forEach(
        (subsection) => (total += subsection._count.questions),
      ),
    );

    return total;
  }
}
