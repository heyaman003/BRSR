import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Row, Section, Table, Question, SubSection, Cell } from './initialData';
import {
  TableModel as TableDTO,
  RowModel as RowDTO,
  SubSectionModel as SubSectionDTO,
  QuestionModel,
  TableModel,
  RowModel,
  CellModel,
} from './section.dtos';
import { DbService } from 'src/utils/db.connections';
import { Prisma, PrismaClient, QuestionType } from '@prisma/client';
import { Omit, PrismaClientOptions } from '@prisma/client/runtime/library';

@Injectable()
export class SectionRepository {
  constructor(private readonly db: DbService) {}

  async retrieveAllSectionData(sectionId: string): Promise<Section> {
    const data = await this.db.section.findUnique({
      where: { id: sectionId },
      include: {
        subsections: {
          include: {
            questions: {
              include: {
                answer_table: {
                  include: {
                    rows: {
                      include: {
                        cells: true,
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

    if (!data) throw new NotFoundException('Section does not exist.');

    return data;
  }

  async updateSubsectionData(id: string, data: SubSectionDTO, userId: string) {
    try {
      await this.db.$transaction(async (tx) => {
        await tx.subsection.update({
          where: { id: id },
          data: {
            questions: {
              update: data.questions.map((question) => ({
                where: {
                  id: question.id,
                },
                data: {
                  isAnswered: this.isQuestionAnswered(question),
                  answer_text: question.answer_text || null,
                  history: {
                    create: {
                      user: {
                        connect: {
                          id: userId,
                        },
                      },
                    },
                  },
                },
              })),
            },
          },
        });
        await Promise.all(
          data.questions.map(
            async (question) =>
              await Promise.all(
                question.answer_table.map(
                  async (table) =>
                    await this.updateTableData(table.id, table, userId, tx),
                ),
              ),
          ),
        );
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async saveTableData(id: string, data: TableDTO, userId: string) {
    await this.updateTableData(id, data, userId, this.db);
  }

  // Updates table data according to the context(obj) provided
  private async updateTableData(
    id: string,
    data: TableDTO,
    userId: string,
    obj:
      | DbService
      | Omit<
          PrismaClient<Prisma.PrismaClientOptions, never>,
          | '$connect'
          | '$disconnect'
          | '$on'
          | '$transaction'
          | '$use'
          | '$extends'
        >,
  ) {
    try {
      await obj.table.update({
        where: {
          id,
        },
        data: {
          question: {
            update: {
              isAnswered:this.isTableCompletelyFilled(data),
              history: {
                create: {
                  user: {
                    connect: {
                      id: userId,
                    },
                  },
                },
              },
            },
          },
          rows: {
            deleteMany: {
              id: {
                notIn: data.rows.map((row) => row.id),
              },
            },
            upsert: data.rows.map((row, ind: number) => ({
              create: {
                isHeading: false,
                index: ind,
                cells: {
                  createMany: {
                    data: row.cells.map((cell) => ({
                      data: cell.data,
                      rowSpan: cell['rowSpan'],
                      colSpan: cell['colSpan'],
                      id: cell.id,
                      isUpdateable: true,
                      index: cell['index'],
                    })),
                  },
                },
              },
              update: {
                cells: {
                  update: row.cells.map((cell) => ({
                    where: { id: cell.id },
                    data: {
                      data: cell.data,
                      rowSpan: cell['rowSpan'],
                      colSpan: cell['colSpan'],
                      isUpdateable: cell['isUpdateable'],
                    },
                  })),
                },
              },
              where: { id: row.id },
            })),
          },
        },
      });
    } catch (e) {
      if (!(e instanceof HttpException)) {
        console.log(e);
        throw new InternalServerErrorException();
      } else throw e;
    }
  }

  async getSubsectionData(id: string) {
    try {
      return await this.db.subsection.findUnique({
        where: {
          id,
        },
        include: {
          questions: {
            include: {
              _count: {
                select: {
                  comments: true,
                },
              },
              answer_table: {
                include: {
                  rows: {
                    include: {
                      cells: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createSection(section: Section, companyId: string) {
    const sectionId = (
      await this.db.section.create({
        data: {
          title: section.title,
          companyId,
        },
        select: {
          id: true,
        },
      })
    ).id;
    await Promise.all(
      section.subsections.map(
        async (subsection) =>
          await this.createSubSection(subsection, sectionId),
      ),
    );
  }

  async createSubSection(
    subSection: SubSection,
    sectionId: string,
  ): Promise<void> {
    const subsectionId = (
      await this.db.subsection.create({
        data: {
          title: subSection.title,
          sectionId,
        },
      })
    ).id;

    await Promise.all(
      subSection.questions.map(async (question, ind: number) =>
        this.createQuestion(question, subsectionId, ind),
      ),
    );
  }

  async createQuestion(
    question: Question,
    subsectionId: string,
    index: number,
  ): Promise<void> {
    const questionId: string = (
      await this.db.question.create({
        data: {
          desc: question.desc,
          subsectionId: subsectionId,
          type: question.type,
          answer_text: question.answer_text,
          index,
        },
      })
    ).id;
    if (question.answer_table)
      await Promise.all(
        question.answer_table.map(
          async (table) => await this.createTable(table, questionId),
        ),
      );
  }

  async createTable(table: Table, questionId: string): Promise<void> {
    const tableId = (
      await this.db.table.create({
        data: {
          isDynamic: table.isDynamic,
          questionId,
        },
        select: {
          id: true,
        },
      })
    ).id;

    await Promise.all(
      table.rows.map(
        async (row: Row | RowDTO, ind: number) =>
          await this.createRow(row, tableId, ind),
      ),
    );
  }

  async createRow(
    row: Row | RowDTO,
    tableId: string,
    ind: number,
  ): Promise<void> {
    await this.db.row.create({
      data: {
        isHeading: row.isHeading,
        tableId: tableId,
        cells: {
          createMany: {
            data: row.cells.map((cell) => cell),
          },
        },
        index: ind,
      },
    });
  }

  async getHistory(questionId: string) {
    try {
      const question = await this.db.question.findUnique({
        where: {
          id: questionId,
        },
        select: {
          history: {
            include: {
              user: true,
            },
          },
        },
      });
      if (!question) throw new NotFoundException('Question does not exist.');

      return question.history;
    } catch (e) {
      if (!(e instanceof HttpException)) {
        console.log(e);
        throw new InternalServerErrorException();
      } else throw e;
    }
  }

  private isQuestionAnswered(question: Question | QuestionModel): boolean {
    if (question.type === QuestionType.TABLE) {
      let flag = true;
      question.answer_table?.forEach((table: Table | TableModel) => {
        flag = flag && this.isTableCompletelyFilled(table);
      });
      return flag;
    } else return question.answer_text ? true : false;
  }

  private isTableCompletelyFilled(table: Table | TableModel): boolean {
    let flag: boolean = true;
    table.rows.forEach((row: Row | RowModel) =>
      row.cells.forEach(
        (cell: Cell | CellModel) => (flag = flag && (cell.data ? true : false)),
      ),
    );
    return flag;
  }
}
