import { Request, Response} from "express";
import User from "../models/user";
import Chat from "../models/chat";

//Obtener todos los chats
const getChats = async (req: Request, res: Response) => {
    try{
        const results = await Chat.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Obtener 1 usuario a partir del id
const getChat = async (req: Request, res: Response) => {
    try{
        const results = await Chat.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo usuario
const newChat = async (req: Request, res: Response) => {
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
    try{
        const results = await Chat.deleteOne({"name": req.params.name});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}



export default {getChats, getChat, newChat, deleteChat};
