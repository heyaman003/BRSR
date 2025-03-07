import { Controller, Get, Param } from "@nestjs/common";
import { SectionService } from "./section.service";
import ResponseModel from "src/utils/ResponseModel";
import { ParseMongoIdPipe } from "src/utils/pipes/ParseMongoIdPipe";
import { Public } from "src/utils/auth/public.decorator";

@Controller('section')
export class SectionController {
    constructor(private readonly sectionService: SectionService){}

    @Get('/subsection/:subsectionId')
    @Public()
    async getSubsectionData(@Param('subsectionId', ParseMongoIdPipe) id: string) {
        const subsectionData = await this.sectionService.getSubsections(id);
        return new ResponseModel(200, "Success", subsectionData);
    }
}