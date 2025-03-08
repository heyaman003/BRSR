import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { SectionService } from './section.service';
import ResponseModel from 'src/utils/ResponseModel';
import { ParseMongoIdPipe } from 'src/utils/pipes/ParseMongoIdPipe';
import { SubSection } from './initialData';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get('/subsection/:subsectionId')
  async getSubsectionData(@Param('subsectionId', ParseMongoIdPipe) id: string) {
    const subsectionData = await this.sectionService.getSubsections(id);
    return new ResponseModel(200, 'Success', subsectionData);
  }

  @Patch('/subsection/:subsectionId')
  async updateSubsectionData(@Param('subsectionId', ParseMongoIdPipe) id: string,@Body() data: SubSection) {
    return await this.sectionService.updateSubsectionData(id, data);
  }
}
