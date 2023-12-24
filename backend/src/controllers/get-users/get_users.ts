import { IGetUserController, IGetUserRepository } from "./protocols";

export class GetUserController implements IGetUserController{
   
    constructor(private readonly getUsersRepository : IGetUserRepository){
        
    }
    
    async handle(){
        try{
            const user = await this.getUsersRepository.getUsers();
            return{
                statusCode:200,
                body:user,
            }
        }catch(error){
            return{
                statusCode:500,
                body:"Something wrong.. i can feel it",
            }
        }
    }
}