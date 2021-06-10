import { Request, Response } from "express";
import User, { IUser } from "../models/user"
import Admin, { IAdmin } from "../models/admin"
import jwt from 'jsonwebtoken';
import config from '../config/config';

async function loginAdmin(req: Request, res: Response) {
    let admin;
        const name = req.body.name;
        const password = req.body.password;
        
        admin = await Admin.findOne({ $or: [{ "name": name }, { "email": name }]});
    
        if(!admin) return res.status(404).json({message: "Admin not found"});
        else{
            if(admin.password != password) return res.status(409).json({message: "Password don't match"});
            else {
                try{
                    let t = {token: createTokenAdmin(admin)}
                    return res.status(200).json(t);
                } catch (err) {
                    return res.status(500).json(err);
                }
            }
        }
    }

async function loginUser(req: Request, res: Response) {
    let user;
        const workerID = req.body.workerID;
        const password = req.body.password;

        user = await User.findOne({"workerID":  workerID });

        if(!user) return res.status(404).json({message: "User not found"});
        else{
            if(user.password != password) return res.status(409).json({message: "Password don't match"});
            else {
                 if(user.petition == false) return res.status(409).json({message: "Petition don't accepted yet"});
                 else{
                    try{
                        let t = {token: createTokenUser(user)}
                        return res.status(200).json(t);
                    } catch (err) {
                        return res.status(500).json(err);
                    }
                 }   
            }
        }
    }

/*async function signout(req:Request, res:Response){
    let t = decodeToken(req.body.token);
    let user = await User.findOne({"_id": t?.id});
    if(!user) return res.status(404).json({message: "User not found"});
    else {
        return res.status(200).json({message: "Usuario desconectado"});
    }
}*/

function createTokenAdmin(admin: IAdmin){
    const expirationTime = 3600; //1h
    return jwt.sign({id:admin.id, name: admin.name, email: admin.email}, config.jwtSecret, {
        expiresIn: expirationTime
    });
}

function createTokenUser(user: IUser){
    const expirationTime = 3600; //1h
    return jwt.sign({id:user.id, name: user.name, email: user.email}, config.jwtSecret, {
        expiresIn: expirationTime
    });
}

/*function decodeToken(token: string){ 
    return jwt.decode(token, {json: true});
}*/

/*async function setOnlineStatus(id: String, value: boolean){
    await User.updateOne({"_id":id}, {$set: {"online":value}});
                    
}*/

export default { loginAdmin, loginUser, createTokenAdmin, createTokenUser };