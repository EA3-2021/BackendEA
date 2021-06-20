import { Request, Response} from "express";
import User from "../models/user";
import Chat from "../models/chat";
import Token from "../models/token";

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

//Obtener todos los chats
const getChats = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized 
    }

    try{
        const results = await Chat.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }

}

//Obtener 1 usuario a partir del id
const getChat = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized 
    }

    try{
        const results = await Chat.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo usuario
const newChat = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized 
    }

    try{
        let chat = new Chat({
            "name" : req.body.name
        });
        chat.save().then((data) => {
            return res.status(201).json(data);
        });
    } catch(err) {
        return res.status(500).json(err);
    }
}


const deleteChat = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized 
    }

    try{
        const results = await Chat.deleteOne({"name": req.params.name});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}



export default {getChats, getChat, newChat, deleteChat};
