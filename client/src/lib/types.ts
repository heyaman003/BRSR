
export class User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    role?: string
    constructor(id: string, name: string, email: string, createdAt: Date) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.createdAt = createdAt;
    }
  }
  
  export class Company {
    id: string;
    name: string;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
    logo?: string;
    constructor(id:string, name: string, users: User[], createdAt: Date, updatedAt: Date, logo: string){
      this.id = id;
      this.name= name;
      this.users = users;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.logo = logo;
    }
  }