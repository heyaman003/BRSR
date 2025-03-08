import { Injectable } from "@nestjs/common";
import { Section, SubSection } from "./initialData";
import { SectionRepository } from "./section.repository";

@Injectable()
export class SectionService {
    constructor(private readonly sectionRepository: SectionRepository){}
    async getSubsections(id: string) {
        return await this.sectionRepository.getSubsectionData(id);
    }

    async createSection(section: Section){
        return await this.sectionRepository.createSection(section);
    }

    async updateSubsectionData(id: string, data: SubSection) {
        return await this.sectionRepository.updateSubsectionData(id, data);
    }
}