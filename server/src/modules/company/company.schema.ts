import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../user/user.schema";
import * as mongoose from 'mongoose'

@Schema({timestamps: true})
export class Company {
    @Prop({type: String, required: [true, "Company name can't be empty."]})
    name: String;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: Company.name}]})
    users: User[]
}

export const CompanySchema = SchemaFactory.createForClass(Company)