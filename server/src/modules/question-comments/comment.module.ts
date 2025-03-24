import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentRepository } from "./comment.repository";

@Module({
    controllers: [CommentController],
    providers: [CommentService, CommentRepository],
})
export class CommentModule{}