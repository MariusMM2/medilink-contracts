export class User {
  // tslint:disable-next-line:variable-name
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  emailVerfied: boolean;
  // reminderEmail: string;
  active: boolean;
  role: Role;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin'
}
