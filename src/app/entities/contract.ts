export class Contract {
  id: number;
  name: string;
  description: string;
  startDate: string;
  expirationDate: string;
  type: string;
  file: string;
  category: string;
  cost: number;
  location: string;
  userId: number;
  driveRef?: DriveContract;
}

export class DriveContract {
  id: string;
  name: string;
  company: string;
  webUrl: string;
  downloadUrl: string;
}

// export class Contract {
//   _id: string;
//   name: string;
//   description: string;
//   startDate: string;
//   expirationDate: string;
//   type: string;
//   file: string;
//   // user: User;
// }

// export class User {
//   id: string;
//   username: string;
//   password?: string;
//   email: string;
//   gender: string;
//   birthDate: Date;
// }
