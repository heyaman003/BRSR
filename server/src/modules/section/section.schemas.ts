import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export enum QuestionType {
  TABLE = 'table',
  TEXT = 'text',
<<<<<<< HEAD
  BOOLEAN = 'boolean'
=======
>>>>>>> 969c5c9 (backend changes)
}

@Schema()
export class Cell {
  @Prop({ type: String, default: '' })
  data: string;

  @Prop({ type: Boolean, default: false })
<<<<<<< HEAD
  isUpdateable: boolean;
=======
  updateable: boolean;
>>>>>>> 969c5c9 (backend changes)

  @Prop({ type: Number, default: 1 })
  rowSpan: number;

  @Prop({ type: Number, default: 1 })
  colSpan: number;
}

export const cellSchema = SchemaFactory.createForClass(Cell);

@Schema()
export class Row {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Cell',
    required: true,
  })
<<<<<<< HEAD
  cells: Cell[];
=======
  rows: Cell[];
>>>>>>> 969c5c9 (backend changes)

  @Prop({ type: Boolean, required: true })
  isHeading: boolean;
}

export const rowSchema = SchemaFactory.createForClass(Row);


@Schema()
export class Table {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Row',
    required: true,
  })
  rows: Row[];
<<<<<<< HEAD
  @Prop({type: Boolean, default: false})
  isDynamic: boolean
=======
>>>>>>> 969c5c9 (backend changes)
}

export const tableSchema = SchemaFactory.createForClass(Table);

@Schema()
export class Question {
  @Prop({
    type: String,
    required: [true, "Question description can't be empty."],
  })
  desc: string;

  @Prop({
    type: String,
    enum: QuestionType,
    required: [true, "Question type can't be empty."],
  })
  type: QuestionType;

  @Prop({
    type: String,
    required: false,
<<<<<<< HEAD
    default: null
=======
>>>>>>> 969c5c9 (backend changes)
  })
  answer_text: string;

  @Prop({
<<<<<<< HEAD
    type: [{type: mongoose.Schema.Types.ObjectId}],
    ref:'Table',
    required: false,
    default: null
  })
  answer_table: Table[];
=======
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: false,
  })
  answer_table: Table;
>>>>>>> 969c5c9 (backend changes)
}

export const questionSchema = SchemaFactory.createForClass(Question);

@Schema()
export class SubSection {
  @Prop({ type: String, required: [true, "SubSection title can't e empty."] })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Question',
    required: true,
  })
<<<<<<< HEAD
  questions: Question[];
=======
  question: Question[];
>>>>>>> 969c5c9 (backend changes)
}

export const subSectionSchema = SchemaFactory.createForClass(SubSection);

@Schema()
export class Section {
  @Prop({ type: String, required: [true, "Section title can't be empty."] })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'SubSection',
    required: true,
  })
  subSections: SubSection[];
}

export const sectionSchema = SchemaFactory.createForClass(Section);
<<<<<<< HEAD


sectionSchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id
  },
})

subSectionSchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id
  },
})

questionSchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id
  },
})

tableSchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id
  },
})


rowSchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id
  },
})


cellSchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id
  },
})

=======
>>>>>>> 969c5c9 (backend changes)
