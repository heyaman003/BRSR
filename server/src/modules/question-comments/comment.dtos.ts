import { IsArray, IsNotEmpty, IsString, IsUUID, Validate, ValidateNested } from "class-validator";

export class AddCommentDTO {
    @IsUUID()
    questionId: string;

    @IsString()
    @IsNotEmpty()
    data: string;

    @IsArray()
    mentions: string[]
}