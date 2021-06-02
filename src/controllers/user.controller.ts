import { Request, Response} from "express";
import User from "../models/user"

//Obtener todos los usuarios
const getUsers = async (req: Request, res: Response) => {
    try{
        const results = await User.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Obtener 1 usuario a partir del id
const getUser = async (req: Request, res: Response) => {
    try{
        const results = await User.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo usuario
const newUser = async (req: Request, res: Response) => {
    try{
    let user = new User({
        "name" : req.body.name,
        "email" : req.body.email,
        "phone" : req.body.phone,
        "password" : req.body.password,
        "insignias": req.body.insignias
    });
    user.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

//Actualizar name/address user a partir del id
function updateUser (req: Request, res: Response){
    const id: string = req.params.id;
    const name: string = req.body.name;
    const email: string = req.body.email;
    const phone: string = req.body.phone;
    const password: string = req.body.password;

    if (name != ""){
        User.updateMany({"_id": id}, {$set: {"name": name}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (email != ""){
        User.updateMany({"_id": id}, {$set: {"email": email}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (phone != ""){
        User.updateMany({"_id": id}, {$set: {"phone": phone}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (password != ""){
        User.updateMany({"_id": id}, {$set: {"password": password}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
        return;
    }
}

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

export default {getUsers, getUser, newUser, updateUser, deleteUser, deleteUsers};