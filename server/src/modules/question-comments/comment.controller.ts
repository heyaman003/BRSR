import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req, ValidationPipe } from "@nestjs/common";
import { AddCommentDTO } from "./comment.dtos";
import { Request } from "express";
import { CommentService } from "./comment.service";
import ResponseModel from "src/utils/ResponseModel";
import { Comment } from "@prisma/client";

@Controller("comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) {}
    @Post("")
    async addComment(@Body(ValidationPipe) commentData: AddCommentDTO, @Req() request: Request) {
        const userId: string = request['user']['sub'];

        const response = await this.commentService.addComment(commentData, userId);

        return new ResponseModel(201, "Added comment succesfully.", response);

    }


    @Get("")
    async getAllComment(@Query("question", ParseUUIDPipe) questionId:string) {

        const response: Comment[] = await this.commentService.listAllComments(questionId);

        return new ResponseModel(200, "Success", response);

    }
}