import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { SectionService } from './section.service';
import ResponseModel from 'src/utils/ResponseModel';
import { ParseMongoIdPipe } from 'src/utils/pipes/ParseMongoIdPipe';
import { SubSection, Table } from './initialData';
import { SubSectionModel, TableModel } from './section.dtos';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get('/subsection/:subsectionId')
  async getSubsectionData(@Param('subsectionId', ParseMongoIdPipe) id: string) {
    const subsectionData = await this.sectionService.getSubsections(id);
    return new ResponseModel(200, 'Success', subsectionData);
  }

  @Post('/subsection/:subsectionId')
  async updateSubsectionData(@Param('subsectionId', ParseMongoIdPipe) id: string,@Body(ValidationPipe) data: SubSectionModel) {
    return new ResponseModel(201, "Saved table data successfully", await this.sectionService.updateSubsectionData(id, data));
  }

  @Post('/table/:tableId')
  async updateTableData(@Param('tableId', ParseMongoIdPipe) id: string,@Body(ValidationPipe) data: TableModel) {
    await this.sectionService.createTable(id, data)
    return new ResponseModel(201, "Saved table data successfully");
  }
}
