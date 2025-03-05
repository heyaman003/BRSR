import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Company } from "../company/company.schema";
import * as mongoose from 'mongoose'
import { UserRole } from "./user.dtos";


@Schema({timestamps: true})
export class User {
    @Prop({type: String, enum: ["ADMIN", "CLIENT", "SUPERADMIN"],  required: [true, "Role can't be empty."]})
    role: UserRole;

    @Prop({type: String, required: [true, "Email can't be empty."], unique: [true, "Email already exists."], lowercase: true})
    email: string;

    @Prop({type: String, required: [true, "Password can't be empty."]})
    password: string;

    @Prop({type: String, required: [true, "Name can't be empty."]})
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: false})
    company: Company;

}

export const UserSchema = SchemaFactory.createForClass(User);