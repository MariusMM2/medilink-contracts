export class User {
  // tslint:disable-next-line:variable-name
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  emailVerfied: boolean;
  active: boolean;
  role: Role;
  notificationEmail: boolean;
  confirmedRole: boolean;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin'
}
