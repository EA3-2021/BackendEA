import { Request, Response } from "express";
import Clock from "../models/clock"
import {format} from "date-fns";

    //Obtener todos las horas de fichar de todos los usuarios a partir de su hora de entrada y compañia
    const getClock = async (req: Request, res: Response) => {
        console.log (req.params.clockIn);
        try{
            const results = await Clock.find({"entryDate": req.params.clockIn});
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }

const clockIn = async (req: Request, res: Response) => {

    try{
    let date: Date = new Date();
    let fecha = format(new Date(date), "d-M-yyyy");
    let hora = format(new Date(date), "HH:mm");

        let c = new Clock({
            "workerID": req.params.workerID,
            "entryDate": fecha,
            "entryTime": hora
        });
        c.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
}

const clockOut = async (req: Request, res: Response) => {

    try{
    let date: Date = new Date();

        let c = new Clock({
            "workerID": req.body.workerID,
            "clockOut": date
        });
        c.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
}



export default { getClock, clockIn, clockOut };