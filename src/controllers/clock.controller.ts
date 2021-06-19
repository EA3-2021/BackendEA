import { Request, Response } from "express";
import Clock from "../models/clock"

    //Obtener todos las horas de fichar de todos los usuarios a partir de su hora de entrada y compañia
    const getClock = async (req: Request, res: Response) => {
        try{
            const results = await Clock.find({"clockIn": req.params.clockIn, "company": req.params.company });
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }

const clockIn = async (req: Request, res: Response) => {

    try{
    let date: Date = new Date();

        let c = new Clock({
            "workerID": req.params.workerID,
            "clockIn": date
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