import { Request, Response} from "express";
import Message from "../models/message";
import Chat from "../models/chat";
import Token from "../models/token";

//Obtener todos los mensajes
const getMessages = async (req: Request, res: Response) => {
    try{
        if (!req.headers.authorization) {
            return res.status(401).json({}); //Unauthorized
        }else if (!Token.findOne({token: req.headers.authorization})) {
            return res.status(401).json({}); //Unauthorized
        }
        const results = await Message.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Obtener 1 mensaje a partir del id
const getMessage = async (req: Request, res: Response) => {
    try{
        if (!req.headers.authorization) {
            return res.status(401).json({}); //Unauthorized
        }else if (!Token.findOne({token: req.headers.authorization})) {
            return res.status(401).json({}); //Unauthorized
        }
        const results = await Message.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo mensaje
const newMessage = async (req: Request, res: Response) => {
    try{
        if (!req.headers.authorization) {
            return res.status(401).json({}); //Unauthorized
        }else if (!Token.findOne({token: req.headers.authorization})) {
            return res.status(401).json({}); //Unauthorized
        }
    let message = new Message({
        "msg" : req.body.msg
    });
    message.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}



const deleteMessage = async (req: Request, res: Response) => {
    try{
        if (!req.headers.authorization) {
            return res.status(401).json({}); //Unauthorized
        }else if (!Token.findOne({token: req.headers.authorization})) {
            return res.status(401).json({}); //Unauthorized
        }
        const results = await Message.deleteOne({"msg": req.params.msg});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}



export default {getMessages, getMessage, newMessage, deleteMessage};
