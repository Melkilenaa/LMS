export interface User {
  user_id: string;
  email: string,
  name: string,
  password: string,
  role: "user",
  contact_no: string,
  isActive: boolean,
  profile_picture: string,
  createdAt: Date,
  updatedAt: Date
}

export interface Role {
  role_id: string;
  role_name: string;
  permissions: string[];
}

export interface Token_details{
  id: string,
  name: string,
  email: string
}