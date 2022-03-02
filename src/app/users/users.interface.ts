export enum Role {
  User = 'user',
  Admin = 'admin',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
export interface UserInterface {
  [prop: string]: any;

  id?: number | string;
  firstname?: string;
  lastname?: string;
  email?: string;
  gender?: Gender.MALE | Gender.FEMALE | Gender.OTHER | null | string;
  dateOfBirth?: Date | null | string;
  avatarUrl?: string | null;
  roles?: Role.Admin | Role.User;
}
