import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Row, Section, Table, Question, SubSection } from './initialData';
import {
  TableModel as TableDTO,
  RowModel as RowDTO,
  SubSectionModel as SubSectionDTO,
  QuestionModel as QuestionDTO,
} from './section.dtos';
import { DbService } from 'src/utils/db.connections';

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

  async updateSubsectionData(id: string, data: SubSectionDTO) {
    try {
      await this.db.$transaction(async (tx) => {
        await tx.subsection.update({
          where: { id: id },
          data: {
            questions: {
              updateMany: data.questions.map((question) => ({
                where: {
                  id: question.id,
                },
                data: {
                  answer_text: question.answer_text || null,
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
                  async (table) => await this.updateTableData(table.id, table, tx),
                ),
              ),
          ),
        );
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async saveTableData(id: string, data: TableDTO) {
    this.updateTableData(id, data, this.db);
  }

  private async updateTableData(id: string, data: TableDTO, obj){
    try {
      await obj.table.update({
        where: {
          id,
        },
        data: {
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
      console.log('Yo');
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async getSubsectionData(id: string) {
    try {
      console.log(id);
      return await this.db.subsection.findUnique({
        where: {
          id,
        },
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
}
