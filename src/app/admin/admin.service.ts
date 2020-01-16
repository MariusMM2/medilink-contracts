import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  isAdmin = false;
  isSuperAdmin = false;
  redirectUrl: string;

  logout(): void {
    this.isAdmin = false;
    this.isSuperAdmin = false;
  }
}
