// store -> Cadastra / Adicionar
// index -> Listar vários
// show -> Listar apenas um 
// update -> Atualizar 
// delete -> Deletar 

import { v4 } from "uuid";

import * as Yup from 'yup';

import User from "../models/User";
class UserContoller {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(), 
        })

        try {
            schema.validateSync(request.body, {abortEarly: false})
        } catch (err) {
            return response.status(400).json({error: err.errors})
        }

        const { name, email, password, admin } = request.body;

        const userExist = await User.findOne({
            where:{
                email,
            },
        });

        if (userExist) {
            return response.status(400).json({error: 'User alreay exists' })
        }

        const user = await User.create({
            id: v4(),
            email,
            password,
            admin,
        }); 
        
        return response.status(201).json({
            id: user.id,
            name,
            email,
            admin,
        })
    }
}

export default new UserContoller()