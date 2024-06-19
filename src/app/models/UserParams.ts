
export class UserParams {
  currentUserName: string = '';
  gender: string = '';
  minAge: number = 18;
  maxAge: number = 80;
  pageNumber: number = 1;
  pageSize: number = 8;
  orderBy: string = 'lastActive';

  constructor() {}
}
