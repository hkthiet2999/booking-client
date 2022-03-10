import { Role } from './role';

export class User {
  id: string;
  role: Role | null;
  access_token: string;

  constructor(id: string, role: Role | null, access_token: string) {
    this.id = id;
    this.role = role;
    this.access_token = access_token;
  }
}
