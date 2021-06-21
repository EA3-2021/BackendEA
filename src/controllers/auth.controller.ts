import { Request, Response } from "express";
import User, { IUser } from "../models/user"
import Admin, { IAdmin } from "../models/admin"
import Token from "../models/token"
import jwt from 'jsonwebtoken';
import config from '../config/config';

async function check_auth(req: Request, must_be_admin: Boolean) { 

    if (!req.headers.authorization) {
        return false; //User is not authorized as request does not include a token
    } 

    try {

        let tok = await Token.findOne({token: req.headers.authorization});

        if (tok == null) {
            return false; //User is not authorized as token does not exist

        } else if (must_be_admin == true){

            if (tok.admin == false) {

                return false; //User is not authorized as he is not an admin and has to be one to use that function

            }
            
        }

    } catch (err) {
        return false; //User is not authorized
    }

    return true; //User is authorized

}


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
                    const tokdel = await Token.deleteMany({'workerID': admin.workerID});

                    let t = new Token({"token": createTokenAdmin(admin), "admin": true, "workerID": admin.workerID});

                    t.save().then((data) => {
                        return res.status(201).json(data);
                    });

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
                return res.status(409).json({ message: "Registration petition don't accepted yet by the Admin" });
            else {

                const tokdel = await Token.deleteMany({'workerID': user.workerID});

                try {

                    
                    let t = new Token({
                        "workerID": user.workerID,
                        "token": createTokenUser(user),
                        "admin": false
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
    const expirationTime = 604800; //1 week
    return jwt.sign({id:admin.id, name: admin.name, email: admin.email}, config.jwtSecret, {
        expiresIn: expirationTime
    });
}

function createTokenUser(user: IUser){
    const expirationTime = 604800; //1 week
    
    var token = jwt.sign({id:user.id, name: user.name, email: user.email}, config.jwtSecret, {
        expiresIn: expirationTime
    });

    return token;
}

const signoutUser = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    const tokdel = await Token.deleteMany({'token': req.headers.authorization});
    
    return res.status(200).json({message: "Usuario desconectado"});

}

export default { loginAdmin, loginUser, createTokenAdmin, createTokenUser, signoutUser }