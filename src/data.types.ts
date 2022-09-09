


import { Request } from "express";

export type NewUserType = {
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export type UserType = {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export type VehicleRegisterType = {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  license: string,
  registeredBy: string,
  dateCreated: string,
  img: string,
  isVerified: boolean
}

export type NewRegisterType = {
  dateCreated: string,
  firstname: string,
  lastname: string,
  email: string,
  license: string,
  registeredBy: string
}

export type DatabaseResponse = {
  success: boolean,
  result: any,
  msg: string
}

export type DatabaseAccessType = {
  GetUsers: () => Promise<DatabaseResponse>,
  GetUser: (email: string) => Promise<DatabaseResponse>
  CreateUser: (data: NewUserType) => Promise<DatabaseResponse>,
  CreateNewRegister: (data: NewRegisterType) => Promise<DatabaseResponse>,
  GetRegisterData: (filter: "email" | "_id" | "license", data: string) => Promise<DatabaseResponse>,
  ConfirmRegister: (id: string) => Promise<DatabaseResponse>
}

export interface RequestInterface extends Request {
  user?: any,
  secret?: any,
  session: any
}

export interface SessionExtends extends Request {}