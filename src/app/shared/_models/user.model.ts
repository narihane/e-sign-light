export interface User {
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

