import { Request, Response} from "express";
import Comment from "../models/comment";

//Obtener todos los comentarios
const getComments = async (req: Request, res: Response) => {
    try{
        const results = await Comment.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Obtener 1 comentario a partir del id
const getComment = async (req: Request, res: Response) => {
    try{
        const results = await Comment.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo comentario
const newComment = async (req: Request, res: Response) => {
    try{
    let comment = new Comment({
        "content" : req.body.content
    });
    comment.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

export default { getComments, getComment, newComment};
