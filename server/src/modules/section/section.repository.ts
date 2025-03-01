import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import {
  Cell as CellModel,
  Section as SectionModel,
  Row as RowModel,
  Table as TableModel,
  Question as QuestionModel,
  SubSection as SubSectionModel,
  QuestionType,
} from './section.schemas';
import { Row, Section, Table, Question, SubSection } from './initialData';
import { InjectModel } from '@nestjs/mongoose';
import { TableModel as TableDTO, RowModel as RowDTO, SubSectionModel as SubSectionDTO, QuestionModel as QuestionDTO } from './section.dtos';

@Injectable()
export class SectionRepository {
  constructor(
    @InjectModel(SectionModel.name) private sectionModel: Model<SectionModel>,
    @InjectModel(CellModel.name) private cellModel: Model<CellModel>,
    @InjectModel(RowModel.name) private rowModel: Model<RowModel>,
    @InjectModel(TableModel.name) private tableModel: Model<TableModel>,
    @InjectModel(QuestionModel.name)
    private questionModel: Model<QuestionModel>,
    @InjectModel(SubSectionModel.name)
    private subSectionModel: Model<SubSectionModel>,
  ) {}

  async updateSubsectionData(id: string, data: SubSectionDTO) {
    try {
      const subsection = await this.subSectionModel.findById(id).populate({
        path: 'questions',
        populate: {
          path: 'answer_table',
          populate: {
            path: 'rows',
            populate: {
              path: 'cells',
            },
          },
        },
      });
      if (!subsection) throw new NotFoundException('Subsection not found.');

      // Traversing through all the questions received in data
      await Promise.all(
        data.questions.map(async (question: QuestionDTO) => {
          if (question.type === QuestionType.TABLE) {
            if (question.answer_table)
              // Looping through all the tables
              await Promise.all(
                question.answer_table.map(async (table: TableDTO) => {
                  await Promise.all(
                    table.rows.map(async (row: RowDTO) => {
                      const existingRow = await this.rowModel.findById(
                        row['id'],
                      );

                      // If row does not exist, create a new row
                      if (!existingRow) {
                        const rowId = await this.createRow(row);
                        await this.tableModel.findByIdAndUpdate(table['id'], {
                          $push: {
                            rows: rowId,
                          },
                        });
                      }
                      // If row exists then update each cell
                      else {
                        await this.cellModel.bulkWrite(
                          row.cells.map((cell) => ({
                            updateOne: {
                              filter: { _id: cell['id'] },
                              update: { $set: cell },
                            },
                          })),
                        );
                      }
                    }),
                  );
                }),
              );
          } else if (
            question.type === QuestionType.TEXT ||
            question.type === QuestionType.BOOLEAN
          ) {
            await this.questionModel.findByIdAndUpdate(
              question['id'],
              question,
              {
                runValidators: true,
                new: true,
              },
            );
          }
        }),
      );

      return data;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async saveTableData(id: string, data: TableDTO) {
    try {
      const table = await this.tableModel.findById(id).populate({
        path: 'rows',
        populate: {
          path: 'cells',
        },
      });
      if (!table) throw new NotFoundException('Table not found.');

      await Promise.all(
        data.rows.map(async (row: RowDTO) => {
          const existingRow = await this.rowModel.findById(row['id']);

          // If row does not exist, create a new row
          if (!existingRow) {
            const rowId = await this.createRow(row);
            await this.tableModel.findByIdAndUpdate(table['id'], {
              $push: {
                rows: rowId,
              },
            });
          }
          // If row exists then update each cell
          else {
            await this.cellModel.bulkWrite(
              row.cells.map((cell) => ({
                updateOne: {
                  filter: { _id: cell['id'] },
                  update: { $set: cell },
                },
              })),
            );
          }
        }),
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getSubsectionData(id: string) {
    try {
      return await this.subSectionModel.findById(id).populate({
        path: 'questions',
        populate: {
          path: 'answer_table',
          populate: {
            path: 'rows',
            populate: {
              path: 'cells',
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * Creates a Section in mongo collection
   * @param section Section datatable
   * @returns Mongodb object id
   */
  async createSection(section: Section) {
    const newSection: SectionModel = await this.sectionModel.create({
      ...section,
      subSections: await Promise.all(
        section.subSections.map(
          async (subSection: SubSection) =>
            await this.createSubSection(subSection),
        ),
      ),
    });

    return newSection['id'];
  }

  /**
   * Creates a SubSection in mongo collection
   * @param subSection SubSection data
   * @returns Mongodb object id
   */
  async createSubSection(subSection: SubSection): Promise<string> {
    const newSubSection: SubSectionModel = await this.subSectionModel.create({
      ...subSection,
      questions: await Promise.all(
        subSection.questions.map(
          async (question: Question) => await this.createQuestion(question),
        ),
      ),
    });

    return newSubSection['id'];
  }

  /**
   * Creates a Question in mongo collection
   * @param question Question data
   * @returns Mongodb object id
   */
  async createQuestion(question: Question): Promise<string> {
    const newQuestion: QuestionModel = await this.questionModel.create({
      ...question,
      answer_table: question.answer_table
        ? await Promise.all(
            question.answer_table.map(
              async (anwerTable: Table) => await this.createTable(anwerTable),
            ),
          )
        : null,
    });
    return newQuestion['id'];
  }

  /**
   * Creates a Table in mongo collection
   * @param row Table data
   * @returns Mongodb object id
   */
  async createTable(table: Table): Promise<string> {
    const newTable: TableModel = await this.tableModel.create({
      ...table,
      rows: await Promise.all(
        table.rows.map(async (row: Row) => await this.createRow(row)),
      ),
    });
    return newTable['id'];
  }

  /**
   * Creates a Row in mongo collection
   * @param row Row data
   * @returns Mongodb object id
   */
  async createRow(row: Row | RowDTO): Promise<string> {
    const cells = await this.cellModel.bulkWrite(
      row.cells.map((cell) => ({
        insertOne: {
          document: cell,
        },
      })),
    );

    const newRow: RowModel = await this.rowModel.create({
      ...row,
      cells: Object.values(cells.insertedIds),
    });

    return newRow['id'];
  }
}
