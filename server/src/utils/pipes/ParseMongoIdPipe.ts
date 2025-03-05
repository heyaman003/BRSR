import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { isMongoId } from "class-validator";

export class ParseMongoIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(isMongoId(value))
            return value;
        else throw new BadRequestException('Invalid MongoId format.')
    }
    
}