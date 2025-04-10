import { Injectable } from '@nestjs/common';
import { Section } from './initialData';
import { SectionRepository } from './section.repository';
import { SubSectionModel, TableModel } from './section.dtos';
import { generatePdf } from 'src/utils/convertToPdf';
import ConflictResolutionGateway from '../conflict-resolution/conflict.resolution.gateway';
import { UserService } from '../user/user.service';

@Injectable()
export class SectionService {
  constructor(
    private readonly sectionRepository: SectionRepository,
    private readonly conflicResolution: ConflictResolutionGateway,
    private readonly userService: UserService,
  ) {}
  async getSubsections(id: string) {
    return await this.sectionRepository.getSubsectionData(id);
  }

  async createSection(section: Section, companyId: string) {
    return await this.sectionRepository.createSection(section, companyId);
  }

  async upsertTable(
    id: string,
    table: TableModel,
    userId: string,
  ): Promise<void> {
    const [updatedTable, userCompanyId] = await Promise.all([
      this.sectionRepository.saveTableData(id, table, userId),
      this.userService.getCompanyOfUser(userId),
    ]);
    this.conflicResolution.broadcastTableChange(userCompanyId, updatedTable, userId);
  }

  async updateSubsectionData(
    id: string,
    data: SubSectionModel,
    userId: string,
  ) {
    return await this.sectionRepository.updateSubsectionData(id, data, userId);
  }

  async extractSectionToPDF(sectionId: string): Promise<string> {
    const data = await this.sectionRepository.retrieveAllSectionData(sectionId);
    const pdfPath = await generatePdf(data);
    return pdfPath;
  }

  async getHistory(questionId: string) {
    return await this.sectionRepository.getHistory(questionId);
  }
}
