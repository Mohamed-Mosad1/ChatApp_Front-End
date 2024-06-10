import { IUser } from "./auth";

export class UserParams {
  gender: string = '';
  minAge: number = 18;
  maxAge: number = 80;
  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(user: IUser) {
    this.gender = user.gender === 'male' ? 'female' : 'male';

  }
}
