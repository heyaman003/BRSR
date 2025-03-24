import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AddCommentDTO {
    @IsUUID()
    questionId: string;

    @IsString()
    @IsNotEmpty()
    data: string;
}