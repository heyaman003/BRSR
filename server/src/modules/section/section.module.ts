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
<<<<<<< HEAD
import { SectionRepository } from './section.repository';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
=======
>>>>>>> 969c5c9 (backend changes)

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
<<<<<<< HEAD
  providers: [SectionRepository, SectionService],
  exports: [SectionService],
  controllers: [SectionController]
=======
>>>>>>> 969c5c9 (backend changes)
})
export class SectionModule {}
