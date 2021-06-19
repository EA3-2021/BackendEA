import { Request, Response } from "express";
import User, { IUser } from "../models/user"
import Admin, { IAdmin } from "../models/admin"
import Token from "../models/token"
import jwt from 'jsonwebtoken';
import config from '../config/config';

async function loginAdmin(req: Request, res: Response) {
    let admin;
        const name = req.body.name;
        const password = req.body.password;

        var crypto = require('crypto');
        let encryptedPass = crypto.createHash('sha256').update(password).digest('hex');
        
        admin = await Admin.findOne({ $or: [{ "name": name }, { "email": name }]});
    
        if(!admin) return res.status(404).json({message: "Wrong credentials, try it again. Incorrect Business name."});
        else{
            if(admin.password != encryptedPass) return res.status(409).json({message: "Wrong credentials, try it again. Incorrect password." });
            else {
                try{
                    let t = {token: createTokenAdmin(admin), _id: admin._id}
                    return res.status(200).json(t);
                } catch (err) {
                    return res.status(500).json(err);
                }
            }
    }
}

async function loginUser(req: Request, res: Response) {
    let user;

    const id = await User.find({"workerID": req.body.workerID},{ "_id": 1});
    const workerID = req.body.workerID;
    const password = req.body.password;

    var crypto = require('crypto');
    let encryptedPass = crypto.createHash('sha256').update(password).digest('hex');

    user = await User.findOne({ "workerID": workerID });

    if (!user)
        return res.status(404).json({ message: "Wrong credentials, try it again. Incorrect Worker ID." });
    else {
        if (user.password != encryptedPass)
            return res.status(409).json({ message: "Wrong credentials, try it again. Incorrect password." });
        else {
            if (user.petition == false)
                return res.status(409).json({ message: "Registrartion petition don't accepted yet by the Admin" });
            else {
                try {
                    let t = new Token({
                        "id": id[0]._id,
                        "token": createTokenUser(user)
                    });
            
                    t.save().then((data) => {
                        return res.status(201).json(data);
                    });
                    } catch(err) {
                        return res.status(500).json(err);
                    }
            }
            
        }
    }
}

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

function decodeToken(token: string){ 
    return jwt.decode(token, {json: true});
}

async function signoutUser(req:Request, res:Response){
    let t1 = decodeToken(req.body.token);
    let user = await User.findOne({"_id": t1?.id});
    if(!user) return res.status(404).json({message: "User not found"});
    else {
        return res.status(200).json({message: "Usuario desconectado"});
    }
}

/*async function setOnlineStatus(id: String, value: boolean){
    await User.updateOne({"_id":id}, {$set: {"online":value}});
                    
}*/

export default { loginAdmin, loginUser, createTokenAdmin, createTokenUser, signoutUser }