import { User } from "../../model/user";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateUserController{
    handle(params: HttpRequest<CreateUserParams>):Promise<HttpResponse<User>>;
}

export interface CreateUserParams{
    name:string,
    emai:string,
    password:string,
}

export interface ICreateUserRepository{
    createUser(params: CreateUserParams):Promise<User>;
}