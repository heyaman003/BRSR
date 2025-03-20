import { Module } from '@nestjs/common';
import { SectionRepository } from './section.repository';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { DbModule } from 'src/utils/db.connection.module';

@Module({
  imports: [
    DbModule
  ],
  providers: [SectionRepository, SectionService],
  exports: [SectionService],
  controllers: [SectionController]
})
export class SectionModule {}
