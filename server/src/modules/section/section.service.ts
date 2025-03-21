import { Injectable } from "@nestjs/common";
import { Section } from "./initialData";
import { SectionRepository } from "./section.repository";
import { SubSectionModel, TableModel } from "./section.dtos";
import { generatePdf } from "src/utils/convertToPdf";

@Injectable()
export class SectionService {
    constructor(private readonly sectionRepository: SectionRepository){}
    async getSubsections(id: string) {
        return await this.sectionRepository.getSubsectionData(id);
    }

    async createSection(section: Section, companyId: string){
        return await this.sectionRepository. createSection(section, companyId);
    }

    async createTable(id: string, table: TableModel){
        return await this.sectionRepository.saveTableData(id, table);
    }

    async updateSubsectionData(id: string, data: SubSectionModel) {
        return await this.sectionRepository.updateSubsectionData(id, data);
    }

    async extractSectionToPDF(sectionId: string): Promise<string> {
        const data = await this.sectionRepository.retrieveAllSectionData(sectionId);
        const pdfPath = await generatePdf(data);
        return pdfPath;
    }
}