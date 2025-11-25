import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { QuestionType } from '@prisma/client';

export class CellModel {
  @IsUUID()
  id: string;
  @IsString()
  data: string;
  @IsInt()
  index: number;
}

export class RowModel {
  @IsUUID()
  id: string;
  @IsBoolean()
  isHeading: boolean;
  cells: CellModel[];
}

export class TableModel {
  @IsUUID()
  id: string;
  rows: RowModel[];
}

export class QuestionModel {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  answer_table: TableModel[];

  @IsString()
  @IsNotEmpty()
  answer_text: string;

  @IsEnum(QuestionType)
  type: QuestionType;
}

export class SubSectionModel {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  questions: QuestionModel[];
}
