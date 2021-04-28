import { Request, Response} from "express";
import User from "../models/user"

const getUsers = async (req: Request, res: Response) => {
    try{
        const results = await User.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const getUser = async (req: Request, res: Response) => {
    try{
        const results = await User.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const newUser = async (req: Request, res: Response) => {
    try{
    let user = new User({
        "name" : req.body.name,
        "email" : req.body.email,
        "birthdate" : req.body.birthdate,
        "phone" : req.body.phone
    });
    user.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

//Actualizar name/address student segun id
function updateUser (req: Request, res: Response){
    const id: string = req.params.id;
    const name: string = req.body.name;
    const email: string = req.body.email;
    const birthdate: string = req.body.birthdate;
    const phone: string = req.body.phone;

    User.update({"_id": id}, {$set: {"name": name, "email": email, "birthdate": birthdate, "phone": phone}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

//Borrar student segun id
const deleteUser = async (req: Request, res: Response) => {
    try{
        const results = await User.deleteOne({"name": req.params.name});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Borrar todos los students
const deleteUsers = async (req: Request, res: Response) => {
    try{
        const results = await User.deleteMany({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

export default {getUsers, getUser, newUser, updateUser, deleteUser, deleteUsers };