import { Request, Response } from "express";
import Clock from "../models/clock"
import Token from "../models/token";
import {format} from "date-fns";

    //Obtener todos las horas de fichar de todos los usuarios a partir de su hora de entrada y compañia
const getClock = async (req: Request, res: Response) => {
        console.log (req.params.clockIn);
        try{
            if (!req.headers.authorization) {
                return res.status(401).json({}); //Unauthorized
            }else if (!Token.findOne({token: req.headers.authorization})) {
                return res.status(401).json({}); //Unauthorized
            }
            const results = await Clock.find({"entryDate": req.params.clockIn});
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }

const clockIn = async (req: Request, res: Response) => {

    try{
        if (!req.headers.authorization) {
            return res.status(401).json({}); //Unauthorized
        }else if (!Token.findOne({token: req.headers.authorization})) {
            return res.status(401).json({}); //Unauthorized
        }

    let date: Date = new Date();
    let fecha = format(new Date(date), "d-M-yyyy");
    let hora = format(new Date(date), "HH:mm");

        let c = new Clock({
            "workerID": req.params.workerID,
            "entryDate": fecha,
            "entryTime": hora,
            "exitDate": "",
            "exitTime": ""
        });
        c.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
}

const clockOut = async (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        return res.status(401).json({}); //Unauthorized
    }else if (!Token.findOne({token: req.headers.authorization})) {
        return res.status(401).json({}); //Unauthorized
    }
    
    let date1: Date = new Date();
    let fecha1 = format(new Date(date1), "d-M-yyyy");
    let hora1 = format(new Date(date1), "HH:mm");

    const workerID: string = req.params.workerID;

    console.log (fecha1);
    console.log (hora1);

    if (fecha1 != ""){
        Clock.updateMany({"workerID":workerID}, {$set: {"exitDate": fecha1}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (hora1 != ""){
        Clock.updateMany({"workerID":workerID}, {$set: {"exitTime": hora1}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }
}



export default { getClock, clockIn, clockOut };