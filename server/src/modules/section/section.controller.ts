import {
  Body,
  ConsoleLogger,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  StreamableFile,
  ValidationPipe,
} from '@nestjs/common';
import { SectionService } from './section.service';
import ResponseModel from 'src/utils/ResponseModel';
import { SubSectionModel, TableModel } from './section.dtos';
import { createReadStream, rm } from 'fs';
import { Request } from 'express';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService, private readonly logger: ConsoleLogger) {}

  @Get('/subsection/:subsectionId')
  async getSubsectionData(@Param('subsectionId', ParseUUIDPipe) id: string) {
    const subsectionData = await this.sectionService.getSubsections(id);
    return new ResponseModel(200, 'Success', subsectionData);
  }

  @Post('/subsection/:subsectionId')
  async updateSubsectionData(
    @Param('subsectionId', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) data: SubSectionModel,
    @Req() request: Request
  ) {
    const userId: string = request['user']['sub'];
    return new ResponseModel(
      201,
      'Saved table data successfully',
      await this.sectionService.updateSubsectionData(id, data, userId),
    );
  }

  @Post('/table/:tableId')
  async updateTableData(
    @Param('tableId', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) data: TableModel,
    @Req() request: Request
  ) {
    const userId: string = request['user']['sub'];
    await this.sectionService.createTable(id, data, userId);
    return new ResponseModel(201, 'Saved table data successfully');
  }

  @Get(':sectionId/extract')
  async extractSectionToPDF(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
  ): Promise<StreamableFile> {
    const path: string =
      await this.sectionService.extractSectionToPDF(sectionId);
    try {
      const stream = createReadStream(path);
      return new StreamableFile(stream, {
        type: 'application/pdf',
      });
    } finally {
      rm(path, (err)=>{
        if(err)
          this.logger.log(err)
      })
    }
  }

  @Get(':question/history')
  async getHistory(@Param('question', ParseUUIDPipe) questionId: string) {
    const history = await this.sectionService.getHistory(questionId);
    return new ResponseModel(200, "Success", history);
  }
}
