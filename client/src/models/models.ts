import { Expose, Type } from 'class-transformer';

export enum QuestionType {
  TABLE = 'table',
  TEXT = 'text',
  BOOLEAN = 'boolean'
}

export class Cell {
  @Expose()
  id: string;
  @Expose()
  data: string;
  @Expose()
  isUpdateable: boolean;
  @Expose()
  rowSpan: number;
  @Expose()
  colSpan: number;

  constructor(
    id: string,
    data: string,
    isUpdateable: boolean,
    rowSpan: number,
    colSpan: number
  ) {
    (this.id = id), (this.data = data);
    this.isUpdateable = isUpdateable;
    this.rowSpan = rowSpan;
    this.colSpan = colSpan;
  }
}

export class Row {
  @Type(()=>Cell)
  cells: Cell[];
  @Expose()
  id: string;
  @Expose()
  isHeading: boolean;
  constructor(id: string, cells: Cell[], isHeading: boolean) {
    this.isHeading = isHeading;
    this.id = id;
    this.cells = cells;
  }
}

export class Table {
  @Expose()
  id: string;
  @Type(()=>Row)
  rows: Row[];
  constructor(id: string, rows: Row[]) {
    this.id = id;
    this.rows = rows;
  }
}

export class Question {
  @Expose()
  id:string;
  @Expose()
  type: QuestionType;
  @Expose()
  desc: string;
  @Expose()
  @Type(()=>Table)
  answer_table?: Table[];
  @Expose()
  answer_text?: string;
  constructor(id: string, type: QuestionType, desc: string, answer_table: Table[], answer_text: string) {
    this.type = type;
    this.id = id;
    this.desc = desc;
    this.answer_table = answer_table;
    this.answer_text = answer_text;
  }
}

export class SubSection {
  @Expose()
  id:string;
  @Expose()
  title: string;
  @Expose()
  @Type(()=>Question)
  questions: Question[];

  constructor(id: string, title: string, questions: Question[]) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }
}

export class Section {
  @Expose()
  id:string;
  @Expose()
  title: string;
  @Expose()
  @Type(()=>SubSection)
  subSections: SubSection[];

  constructor(id: string, title: string, subSections: SubSection[]) {
    this.id = id;
    this.title = title;
    this.subSections = subSections;
  }
}

