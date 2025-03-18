import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { QuestionType } from "./section.schemas";

export class CellModel {
    @IsMongoId()
    id: string;

    data: string;
}

export class RowModel {
    @IsMongoId()
    id: string;

    cells: CellModel[]
}

export class TableModel {
    @IsMongoId()
    id: string;

    rows: RowModel[]
}

export class QuestionModel {
    @IsMongoId()
    id: string;

    @IsString()
    @IsNotEmpty()
    desc: string;

    answer_table: TableModel[]

    @IsString()
    @IsNotEmpty()
    answer_text: string;

    @IsEnum(QuestionType)
    type: QuestionType
}

export class SubSectionModel {
    @IsMongoId()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string

    questions: QuestionModel[]
}

