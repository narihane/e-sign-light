
import { Role } from "./role.model";
export interface RegisterUser {
  userName: string;
  password: string;
  userRole: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  country: string;
}
//Returns from post request of login
export class User {
    id: number=0;
    username: string="";
    password: string="";
    firstName: string="";
    lastName: string="";
    role: Role=Role.User;
    token?: string;
}

export interface UserData {
  id: number;
  username: string;
  password: string;
  role: number;
  status: number;
  usersdetail: Usersdetail;
}

export interface Usersdetail {
  userid: number;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  country: string;
  fullAddress: string;
}

