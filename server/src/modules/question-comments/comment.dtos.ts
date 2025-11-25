import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  Validate,
  ValidateNested,
} from 'class-validator';

export class AddCommentDTO {
  @IsUUID()
  questionId: string;

  @IsString()
  @IsNotEmpty()
  data: string;

  @IsArray()
  mentions: string[]; //UserId
}
export class AssignUserToQuestionDTO {
  @IsUUID()
  questionId: string;

  @IsUUID()
  userId: string;
}
export class AssignApproveUserToQuestionDTO extends AssignUserToQuestionDTO {}
