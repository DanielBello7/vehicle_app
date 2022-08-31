


import {Request} from "express";

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

export type VehicleInformationType = {

}

export type DatabaseResponse = {
  success: boolean,
  result: any,
  msg: string
}

export type DatabaseAccessType = {
  GetUsers: () => Promise<DatabaseResponse>,
  GetUser: (email: string) => Promise<DatabaseResponse>
  CreateUser: (data: NewUserType) => Promise<DatabaseResponse>
}

export interface RequestInterface extends Request {
  user?: any,
  secret?: any,
  session: any
}

export interface SessionExtends extends Request {}