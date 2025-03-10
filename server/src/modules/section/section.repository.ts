import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
import { Cell, Row, Section, Table, Question, SubSection } from './initialData';
import { InjectModel } from '@nestjs/mongoose';
import path from 'path';

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

  async updateSubsectionData(id: string, data: SubSection) {
    try{
      const subsection  = await this.subSectionModel.findById(id).populate({path:'questions', populate: {
        path: 'answer_table',
        populate: {
          path: 'rows',
          populate: {
            path: 'cells'
          }
        }
      }});
      if(!subsection)
        throw new NotFoundException("Subsection not found.")
      
      // data.questions.forEach((question:Question)=>{
      //   if(question.type===QuestionType.TABLE){
      //     question.answer_table?.forEach((table: Table)=>{
      //       table.rows.forEach((row: Row)=>{
      //         row.cells.forEach(async (cell: Cell)=>{
      //           await this.cellModel.findByIdAndUpdate(cell['id'], cell, {runValidators: true, new: true})
      //         })
      //       })
      //     })
      //   }else if(question.type === QuestionType.TEXT){

      //   }
      // })

      return subsection;
    }catch(e){
      console.log(e)
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
              path: 'cells'
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
   * @param section Section data
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
  async createRow(row: Row): Promise<string> {
    const newRow: RowModel = await this.rowModel.create({
      ...row,
      cells: await Promise.all(
        row.cells.map(async (cell: Cell) => await this.createCell(cell)),
      ),
    });
    return newRow['id'];
  }

  /**
   * Creates a Cell in mongo collection
   * @param cell Cell data
   * @returns Mongodb object id
   */
  async createCell(cell: Cell): Promise<string> {
    const newCell: CellModel = await this.cellModel.create(cell);
    return newCell['id'];
  }
}
