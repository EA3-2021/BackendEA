import { Request, Response} from "express";
import Comment from "../models/comment";
import User from "../models/user";
import Token from "../models/token";

//Obtener todos los comentarios
const getComments = async (req: Request, res: Response) => {
    try{
        if (!req.headers.authorization) {
            return res.status(401).json({}); //Unauthorized
        }else if (!Token.findOne({token: req.headers.authorization})) {
            return res.status(401).json({}); //Unauthorized
        }
        const results = await Comment.find({"workerID": req.params.workerID});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const getCommentsAdmin = async (req: Request, res: Response) => {
   
   console.log(req.params.companyName);
    try{
        if (!req.headers.authorization) {
            return res.status(401).json({}); //Unauthorized
        }else if (!Token.findOne({token: req.headers.authorization})) {
            return res.status(401).json({}); //Unauthorized
        }
        const results = await Comment.find({"company": req.params.companyName, "state": false});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}


//Añadir 1 nuevo comentario
const newComment = async (req: Request, res: Response) => {
    
    const resultado = await User.find({"workerID": req.body.workerID},{ "_id": 0, "company": 1});
    console.log(resultado[0].company)

    if (!req.headers.authorization) {
        return res.status(401).json({}); //Unauthorized
    }else if (!Token.findOne({token: req.headers.authorization})) {
        return res.status(401).json({}); //Unauthorized
    } 

    try{
    let comment = new Comment({
        "company" : resultado[0].company,
        "workerID" : req.body.workerID,
        "content" : req.body.content,
        "state" : false
    });
    comment.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

const deleteComment = async (req: Request, res: Response) => {

        if (!req.headers.authorization) {
            return res.status(401).json({}); //Unauthorized
        }else if (!Token.findOne({token: req.headers.authorization})) {
            return res.status(401).json({}); //Unauthorized
        }

    console.log(req.body.id);
    try{
        const results = await Comment.deleteOne({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const resolveComment = async (req: Request, res: Response) => {
         if (!req.headers.authorization) {
            return res.status(401).json({}); //Unauthorized
        }else if (!Token.findOne({token: req.headers.authorization})) {
            return res.status(401).json({}); //Unauthorized
        }
           
    Comment.updateMany({"_id":req.params.id}, {$set: {"state": true}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })

}



export default {resolveComment, getCommentsAdmin, deleteComment, getComments, newComment};
