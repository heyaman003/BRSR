import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../user/user.schema";
import * as mongoose from 'mongoose'
import { Section } from "../section/section.schemas";

@Schema({timestamps: true})
export class Company {
    @Prop({type: String, required: [true, "Company name can't be empty."]})
    name: String;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    users: User[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: Section.name}]})
    sections: Section[]
}

export const CompanySchema = SchemaFactory.createForClass(Company)

CompanySchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id
  },
})