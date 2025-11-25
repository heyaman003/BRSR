import { User } from '@prisma/client';

export class CompanyDto {
  id: string;
  name: String;
  users: User[];
  updatedAt: Date;
  createdAt: Date;
}
