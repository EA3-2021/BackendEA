import { Request, Response} from "express";
import Faq from "../models/faq"
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

//Obtener todos los usuarios
const getFaqs = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await Faq.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Obtener 1 usuario a partir del id
const getFaq = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await Faq.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo usuario
const newFaq = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
    let user = new Faq({
        "title" : req.body.title,
        "content" : req.body.content,
    });
    user.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

const updateFaq = async(req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    const id: string = req.params.id;
    const title: string = req.body.title;
    const content: string = req.body.content;

    if (title != ""){
        Faq.updateMany({"_id": id}, {$set: {"title": title}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (content != ""){
        Faq.updateMany({"_id": id}, {$set: {"content": content}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

}

const deleteFaq = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await Faq.deleteOne({"title": req.params.title});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Borrar todos los students

export default {getFaqs, getFaq, newFaq, updateFaq, deleteFaq };