import { Expose, Type } from "class-transformer";

export enum QuestionType {
  TABLE = "TABLE",
  TEXT = "TEXT",
  BOOLEAN = "BOOLEAN",
}

export enum Operation {
  ADD = "ADD",
  DIV = "DIV",
  MUL = 'MUL',
  PERCENTAGE = "PERCENTAGE",
  SUMDIVIDE = "SUMDIVIDE",
  SUB = 'SUB',
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
  @Expose()
  index: number;
  @Expose()
  operation?: Operation;
  @Expose()
  operands?:string[]
  @Expose()
  isHeading?: boolean;

  constructor(
    id: string,
    data: string,
    isUpdateable: boolean,
    rowSpan: number,
    colSpan: number,
    index: number
  ) {
    (this.id = id), (this.data = data);
    this.isUpdateable = isUpdateable;
    this.rowSpan = rowSpan;
    this.colSpan = colSpan;
    this.index = index;
  }
}

export class Row {
  @Type(() => Cell)
  cells: Cell[];
  @Expose()
  id: string;
  @Expose()
  isHeading: boolean;
  @Expose()
  index: number;
  constructor(id: string, cells: Cell[], isHeading: boolean, index: number) {
    this.isHeading = isHeading;
    this.id = id;
    this.cells = cells;
    this.index = index;
  }
}

export class Table {
  @Expose()
  isDynamic: boolean;
  @Expose()
  id: string;
  @Type(() => Row)
  rows: Row[];

  conflict?: Row[] | null; //Stores the  rows if any

  constructor(id: string, rows: Row[], isDynamic: boolean) {
    this.id = id;
    this.rows = rows;
    this.isDynamic = isDynamic;
  }
}

export class Question {
  @Expose()
  id: string;
  @Expose()
  type: QuestionType;
  @Expose()
  desc: string;
  @Expose()
  @Type(() => Table)
  answer_table?: Table[];
  @Expose()
  answer_text?: string;
  @Expose()
  index: number;
  @Expose()
  heading?: string;
  @Expose()
  text_conflict?: string;
  @Expose()
  assignedToId?: string;
  @Expose()
  approveToId?: string;
  @Expose()
  isApproved: boolean = false;
  _count: {
    comments: number;
  };

  constructor(
    id: string,
    type: QuestionType,
    desc: string,
    answer_table: Table[],
    answer_text: string,
    index: number,
    _count: { comments: number },
    isApproved: boolean = false
  ) {
    this.type = type;
    this.id = id;
    this.index = index;
    this.desc = desc;
    this.answer_table = answer_table;
    this.answer_text = answer_text;
    this._count = _count;
    this.isApproved=isApproved
  }
}

export class SubSection {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  @Type(() => Question)
  questions: Question[];
  @Expose()
  index: number;
  _count?:{
    questions: number
  }

  constructor(id: string, title: string, questions: Question[], index: number) {
    this.id = id;
    this.title = title;
    this.questions = questions;
    this.index = index;
  }
}

export class Section {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  @Type(() => SubSection)
  subsections: SubSection[];

  constructor(id: string, title: string, subSections: SubSection[]) {
    this.id = id;
    this.title = title;
    this.subsections = subSections;
    // this.data = data;
  }
}

export class Comment {
  @Expose()
  data?: string;
  @Expose()
  createdAt?: Date;
  @Expose()
  id?: string;

  @Type(()=>CommentUser)
  user?: CommentUser
}

export class History {
  @Expose()
  createdAt?: Date;
  
  @Expose()
  id?: string;

  @Type(()=>CommentUser)
  user?: CommentUser
}


class CommentUser {
  @Expose()
  id?: string;
  @Expose()
  email?: string;
  @Expose()
  name?: string;
};

export class Mention {
  @Expose()
  questionId?: string;
  @Expose()
  sectionId?: string;
  @Expose()
  subsectionId?: string;
  @Expose()
  companyId?: string;
  @Expose()
  id?: string;
  @Expose()
  createdAt?: Date
  
  mentionedBy?: {
    id: string;
    email: string;
    name: string;
  }
}