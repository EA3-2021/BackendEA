import { Request, Response} from "express";
import User from "../models/user"
import Setting from "../models/setting"

//Obtener todos los usuarios
const getSettingsUsers = async (req: Request, res: Response) => {
    try{
        const results = await Setting.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Obtener 1 usuario a partir del id
const getSettingsUser = async (req: Request, res: Response) => {
    try{
        const results = await Setting.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo usuario
const newSettingsUser = async (req: Request, res: Response) => {
    try{
    let setting = new Setting({
        "name" : req.body.name,
        "notifications" : req.body.notifications,
        "privacity" : req.body.privacity,
        "security" : req.body.security
    });
    setting.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

//Actualizar name/address user a partir del id
function updateSettingsUser (req: Request, res: Response){
    const id: string = req.params.id;
    const name: string = req.body.name;
    const notifications: string = req.body.notifications;
    const privacity: string = req.body.privacity;
    const security: string = req.body.security;

    if (name != ""){
        Setting.updateMany({"_id": id}, {$set: {"name": name}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (notifications != ""){
        Setting.updateMany({"_id": id}, {$set: {"notifications": notifications}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (privacity != ""){
        Setting.updateMany({"_id": id}, {$set: {"privacity": privacity}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (security != ""){
        Setting.updateMany({"_id": id}, {$set: {"security": security}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
        return;
    }
}




export default {getSettingsUsers, getSettingsUser, newSettingsUser, updateSettingsUser };