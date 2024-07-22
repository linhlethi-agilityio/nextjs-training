export interface UserLogin {
  email: string;
  password: string;
}
export interface User extends UserLogin {
  name: string;
  role: string;
}
