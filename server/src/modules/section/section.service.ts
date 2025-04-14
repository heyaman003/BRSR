import { Injectable } from '@nestjs/common';
import { Section } from './initialData';
import { SectionRepository } from './section.repository';
import { SubSectionModel, TableModel } from './section.dtos';
import { generatePdf } from 'src/utils/convertToPdf';
import ConflictResolutionGateway from '../conflict-resolution/conflict.resolution.gateway';

@Injectable()
export class SectionService {
  constructor(
    private readonly sectionRepository: SectionRepository,
    private readonly conflicResolution: ConflictResolutionGateway,
  ) {}
  async getSubsections(id: string) {
    return await this.sectionRepository.getSubsectionData(id);
  }

  async createSection(section: Section, companyId: string) {
    return await this.sectionRepository.createSection(section, companyId);
  }

  async upsertTable(
    tableId: string,
    companyId: string,
    table: TableModel,
    userId: string,
  ): Promise<void> {
    const updatedTable = await this.sectionRepository.saveTableData(
      tableId,
      table,
      userId,
    );
    this.conflicResolution.broadcastTableChange(
      companyId,
      updatedTable,
      userId,
    );
  }

  async updateSubsectionData(
    subsectionId: string,
    companyId: string,
    data: SubSectionModel,
    userId: string,
  ) {
    await this.sectionRepository.updateSubsectionData(
      subsectionId,
      data,
      userId,
      companyId,
    );
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
