import { Module } from '@nestjs/common';
import { SectionRepository } from './section.repository';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { UserModule } from '../user/user.module';
import { ConflictResolutionModule } from '../conflict-resolution/conflict.resolution.module';

@Module({
  providers: [SectionRepository, SectionService],
  exports: [SectionService],
  controllers: [SectionController],
  imports: [UserModule, ConflictResolutionModule],
})
export class SectionModule {}
