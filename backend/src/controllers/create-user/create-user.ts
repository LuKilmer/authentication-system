import { User } from "../../model/user";
import validator from "validator";
import { HttpResponse, HttpRequest } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocol";

export class CreateUserController implements ICreateUserController{
    constructor(private readonly createUserRepository: ICreateUserRepository){}
    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try{
            const requiredFields = ["name","email","password"];
            

            //check that the fields are filled in
     
            for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length){
                    return{
                        statusCode:400,
                        body:"Please specify a body",
                    };
                }
            }

            //check email is valid
            const emailIsValid = validator.isEmail(httpRequest.body!.email);
            if(!emailIsValid){
                return{
                    statusCode:400,
                    body:"Email is invalid",
                };
            }

            //check password strengh

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