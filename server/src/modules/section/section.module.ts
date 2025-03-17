import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Cell,
  cellSchema,
  Question,
  questionSchema,
  Row,
  rowSchema,
  Section,
  sectionSchema,
  SubSection,
  subSectionSchema,
  Table,
  tableSchema,
} from './section.schemas';
import { SectionRepository } from './section.repository';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Section.name, schema: sectionSchema },
      { name: SubSection.name, schema: subSectionSchema },
      { name: Question.name, schema: questionSchema },
      { name: Table.name, schema: tableSchema },
      { name: Row.name, schema: rowSchema },
      { name: Cell.name, schema: cellSchema },
    ]),
  ],
  providers: [SectionRepository, SectionService],
  exports: [SectionService],
  controllers: [SectionController]
})
export class SectionModule {}
