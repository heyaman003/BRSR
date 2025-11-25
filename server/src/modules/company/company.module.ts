import { Module } from '@nestjs/common';
import { CompanyController } from 'src/modules/company/company.controller';
import { CompanyRepository } from 'src/modules/company/company.repository';
import { CompanyService } from 'src/modules/company/company.service';
import { SectionModule } from '../section/section.module';
import { DbModule } from 'prisma/db.connection.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  imports: [SectionModule, DbModule, UserModule],
  exports: [CompanyService],
})
export class CompanyModule {}
