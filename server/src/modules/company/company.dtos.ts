import { User } from "src/modules/user/user.schema";

export class CompanyDto {
    id: string;
    name: String;
    users: User[]
    updatedAt: Date;
    createdAt: Date;
}