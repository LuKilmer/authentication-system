import { User } from "../../model/user";
import { HttpResponse, HttpRequest } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocol";

export class CreateUserController implements ICreateUserController{
    constructor(private readonly createUserRepository: ICreateUserRepository){}
    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try{
            if(!httpRequest.body){
                return{
                    statusCode:400,
                    body:"Please specify a body",
                };
            }
            const user = await this.createUserRepository.createUser(httpRequest.body);


            return {
                statusCode:201,
                body:user,
            }
        }catch(error){ 
            console.log(error)
            return{
                statusCode:500,
                body:"Something went wrong with server...",
            }
        }
    }
    
}