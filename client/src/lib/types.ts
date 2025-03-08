export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role?: string;
    department?: string;
  }
  
  export interface Company {
    name: string;
    logo?: string;
    users: User[];
  }