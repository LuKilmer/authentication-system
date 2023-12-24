import { User } from "../../model/user";
import { HttpResponse } from "../protocols";


export interface IGetUserController{
    handle(): Promise<HttpResponse<User[]>>;
}

export interface IGetUserRepository{
    getUsers():Promise<User[]>
}