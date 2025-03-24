import { Injectable } from "@nestjs/common";
import { AddCommentDTO } from "./comment.dtos";
import { CommentRepository } from "./comment.repository";
import { Comment } from "@prisma/client";

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository){}

    async addComment(commentData: AddCommentDTO, userId: string) {
        return await this.commentRepository.addComment(commentData, userId);
    }

    async listAllComments(questionId: string): Promise<Comment[]> {
        return await this.commentRepository.listAllComents(questionId);
    }
}