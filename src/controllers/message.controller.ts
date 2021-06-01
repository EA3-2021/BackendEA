import { Request, Response} from "express";
import Message from "../models/message"

//Obtener todos los usuarios
const getMessages = async (req: Request, res: Response) => {
    try{
        const results = await Message.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Obtener 1 mensaje a partir del id
const getMessage = async (req: Request, res: Response) => {
    try{
        const results = await Message.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo usuario
const newMessage = async (req: Request, res: Response) => {
    try{
    let message = new Message({
        "description" : req.body.description
    });
    message.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

//Actualizar affair/description report a partir del id
function updateMessage (req: Request, res: Response){
    const id: string = req.params.id;
    const description: string = req.body.description;

    if (description != ""){
        Message.updateMany({"_id": id}, {$set: {"description": description}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }
}

const deleteMessage = async (req: Request, res: Response) => {
    try{
        const results = await Message.deleteOne({"description": req.params.description});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Borrar todos los students
const deleteMessages = async (req: Request, res: Response) => {
    try{
        const results = await Message.deleteMany({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

export default {getMessages, getMessage, newMessage, updateMessage, deleteMessage, deleteMessages };