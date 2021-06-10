import { Request, Response} from "express";
import User from "../models/user";
import Tarea from "../models/tarea";
import Location from "../models/location";


async function registerUser(req:Request, res:Response) {
    let user = req.body;
    let checkEmail = await User.findOne({"email": user.email});
    let checkPhone = await User.findOne({"phone": user.phone});

    if(checkEmail) return res.status(409).json({code: 409, message: "This email already exists"});
    else if (checkPhone) return res.status(410).json({code: 410, message: "This phone number already exists"});
    else {
        try{

        let u = new User({
            "company": user.company,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "password": user.password,
            "workerID": generateRandomString(6),
            "petition": false
        });
        u.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
    }
}

function generateRandomString(length: number) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

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
        "password" : req.body.password
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

const newTask = async (req: Request, res: Response) => {
    try{
    let tarea = new Tarea({
        "titulo" : req.body.titulo,
        "descripcion" : req.body.descripcion,
        "fecha":req.body.fecha,
        "horaI" : req.body.horaI,
        "horaF" : req.body.horaF
    });
    tarea.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

const getTask = async (req: Request, res: Response) => {
    try{
        const results = await Tarea.find({"fecha": req.params.fecha});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const deleteTask = async (req: Request, res: Response) => {
    try{
        const results = await Tarea.deleteOne({"titulo": req.params.titulo});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}


//Añadir nueva localización de un usuario
const newLocation = async (req: Request, res: Response) => {
    try{
    let location = new Location({
        "latitude" : req.body.latitude,
        "longitude" : req.body.longitude
    });
    location.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

export default {registerUser, getUsers, getUser, newUser, updateUser, deleteUser, deleteUsers, newTask, newLocation, getTask, deleteTask};
