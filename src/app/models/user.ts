export class User {
  // tslint:disable-next-line:variable-name
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin'
}
