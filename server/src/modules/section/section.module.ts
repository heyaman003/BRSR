import { Module } from '@nestjs/common';
import { SectionRepository } from './section.repository';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';

@Module({
  providers: [SectionRepository, SectionService],
  exports: [SectionService],
  controllers: [SectionController]
})
export class SectionModule {}
