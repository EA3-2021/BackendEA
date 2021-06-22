import { Request, Response } from "express";
import Clock from "../models/clock"
import Token from "../models/token";
import Code from "../models/code";
import {format} from "date-fns";

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


async function check_self(req: Request, workerID: String) { 

    try {

        let tok = await Token.findOne({token: req.headers.authorization});

        if (tok == null) {
            return false; //User is not authorized as token does not exist

        } else if ((tok.workerID == workerID) || tok.admin) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        return false; //User is not authorized
    }

}

//Obtener todos las horas de fichar de todos los usuarios a partir de su hora de entrada y compañia
const getClock = async (req: Request, res: Response) => {

    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/

    try{
        const results = await Clock.find({"entryDate": req.params.clockIn});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }

}

const clockIn = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    const sel = await check_self(req, req.params.workerID);

    if (!sel) {
        return res.status(401).json({}); //Unauthorized
    }

    let checkCode = await Code.findOne({"code": req.params.code});

    if(checkCode) {
        try{
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
    else {
        return res.status(409).json({code: 409, message: "Incorrect clock-in code"});
    }
}

const clockOut = async (req: Request, res: Response) => {
    
    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    const sel = await check_self(req, req.params.workerID);

    if (!sel) {
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