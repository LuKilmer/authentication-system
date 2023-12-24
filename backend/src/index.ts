import express from 'express'
import { config } from 'dotenv';
import { GetUserController } from './controllers/get-users/get_users';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-user';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import { CreateUserController } from './controllers/create-user/create-user';
//import {config} from 'dotenv'
config();

const main = async()=> {
    const app = express();

    app.use(express.json());

    await MongoClient.connect();
    console.log("connect with mongoDB");

    const port = process.env.PORT || 8000;
    app.listen(port,()=>console.log(`Ativo na porta ${port}`));

    app.get("/",(req,res)=>{
        res.send(`Hello World `);
    });

    app.get("/users", async (req,res)=>{
        const mongoGetUsersRepository = new MongoGetUsersRepository();
        const getUsersController = new GetUserController(mongoGetUsersRepository);
        const {body, statusCode} = await getUsersController.handle();
        
        res.send(body).status(statusCode);
    });

    app.post("/users", async (req, res)=>{
        const mongocreateuserrepository = new MongoCreateUserRepository();
        
        const createusercontroller = new CreateUserController(mongocreateuserrepository);

        const {body, statusCode} = await createusercontroller.handle({
            body: req.body,
        });
        res.send(body).status(statusCode);
    });
}

main();