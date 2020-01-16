export class Contract {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  expirationDate: Date;
  type: string;
  file: string;
  category: string;
  cost: number;
  location: string;
  driveRef?: DriveContract;
}

export class DriveContract {
  id: string;
  name: string;
  company: string;
  webUrl: string;
  downloadUrl: string;
}
