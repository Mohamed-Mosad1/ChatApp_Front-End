export interface ILogin {
  userName: string;
  password: string;
}

export interface IUser {
  userName: string;
  email: string;
  gender: string;
  token: string;
  photoUrl: string;
  roles: string[];
}

export interface IResetPassword {
  email: string
  emailToken: string
  newPassword: string
  confirmPassword: string
}
