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
      // const subsection = await this.db.findById(id).populate({
      //   path: 'questions',
      //   populate: {
      //     path: 'answer_table',
      //     populate: {
      //       path: 'rows',
      //       populate: {
      //         path: 'cells',
      //       },
      //     },
      //   },
      // });
      // if (!subsection) throw new NotFoundException('Subsection not found.');
      // // Traversing through all the questions received in data
      // await Promise.all(
      //   data.questions.map(async (question: QuestionDTO) => {
      //     if (question.type === QuestionType.TABLE) {
      //       if (question.answer_table)
      //         // Looping through all the tables
      //         await Promise.all(
      //           question.answer_table.map(async (table: TableDTO) => {
      //             await Promise.all(
      //               table.rows.map(async (row: RowDTO) => {
      //                 const existingRow = await this.rowModel.findById(
      //                   row['id'],
      //                 );
      //                 // If row does not exist, create a new row
      //                 if (!existingRow) {
      //                   const rowId = await this.createRow(row);
      //                   await this.tableModel.findByIdAndUpdate(table['id'], {
      //                     $push: {
      //                       rows: rowId,
      //                     },
      //                   });
      //                 }
      //                 // If row exists then update each cell
      //                 else {
      //                   await this.cellModel.bulkWrite(
      //                     row.cells.map((cell) => ({
      //                       updateOne: {
      //                         filter: { _id: cell['id'] },
      //                         update: { $set: cell },
      //                       },
      //                     })),
      //                   );
      //                 }
      //               }),
      //             );
      //           }),
      //         );
      //     } else if (
      //       question.type === QuestionType.TEXT ||
      //       question.type === QuestionType.BOOLEAN
      //     ) {
      //       await this.questionModel.findByIdAndUpdate(
      //         question['id'],
      //         question,
      //         {
      //           runValidators: true,
      //           new: true,
      //         },
      //       );
      //     }
      //   }),
      // );
      // return data;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async saveTableData(id: string, data: TableDTO) {
    try {
      await this.db.table.update({
        where: {
          id
        },
        data: {
          rows: {
            deleteMany: {
              id: {
                notIn: data.rows.map(row=>row.id)
              }
            },
            upsert: data.rows.map((row, ind: number)=>({
              create: {
                isHeading: false,
                index: ind,
                cells: {
                  createMany:{
                    data: row.cells.map(cell=>({
                      data: cell.data,
                      rowSpan: cell['rowSpan'],
                      colSpan: cell['colSpan'],
                      id: cell.id,
                      isUpdateable: true,
                      index: cell['index']
                    }))
                  }
                }
              },
              update: {
                cells: {
                  update: row.cells.map(cell=>({
                    where: {id: cell.id},
                    data: {
                      data: cell.data,
                      rowSpan: cell['rowSpan'],
                      colSpan: cell['colSpan'],
                      isUpdateable: cell['isUpdateable']
                    }
                  }))
                }
              },
              where: {id: row.id}
            }))
          }
        }
      })
      //   path: 'rows',
      //   populate: {
      //     path: 'cells',
      //   },
      // });
      // if (!table) throw new NotFoundException('Table not found.');
      // await Promise.all(
      //   data.rows.map(async (row: RowDTO) => {
      //     const existingRow = await this.rowModel.findById(row['id']);
      //     // If row does not exist, create a new row
      //     if (!existingRow) {
      //       const rowId = await this.createRow(row);
      //       await this.tableModel.findByIdAndUpdate(table['id'], {
      //         $push: {
      //           rows: rowId,
      //         },
      //       });
      //     }
      //     // If row exists then update each cell
      //     else {
      //       await this.cellModel.bulkWrite(
      //         row.cells.map((cell) => ({
      //           updateOne: {
      //             filter: { _id: cell['id'] },
      //             update: { $set: cell },
      //           },
      //         })),
      //       );
      //     }
      //   }),
      // );
    } catch (e) {
      console.log(e)
      throw new BadRequestException(e.message);
    }
  }

  async getSubsectionData(id: string) {
    try {
      console.log(id)
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
    index: number
  ): Promise<void> {
    const questionId: string = (
      await this.db.question.create({
        data: {
          desc: question.desc,
          subsectionId: subsectionId,
          type: question.type,
          answer_text: question.answer_text,
          index
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
      table.rows.map(async (row: Row | RowDTO, ind: number) => await this.createRow(row, tableId, ind)),
    );
  }


  async createRow(row: Row | RowDTO, tableId: string, ind: number): Promise<void> {
    await this.db.row.create({
      data: {
        isHeading: row.isHeading,
        tableId: tableId,
        cells: {
          createMany: {
            data: row.cells.map((cell) => cell),
          },
        },
        index: ind
      },
    });
  }
}
