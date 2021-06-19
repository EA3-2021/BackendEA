import { Request, Response } from "express";
import Clock from "../models/clock"

    //Obtener todos las horas de fichar de todos los usuarios
    const getClocks = async (req: Request, res: Response) => {
        try{
            const results = await Clock.find({});
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }

const clockIn = async (req: Request, res: Response) => {

    try{
    let date: Date = new Date();

        let c = new Clock({
            "workerID": req.body.workerID,
            "clockIn": date
        });
                    console.log(req.body.workerID);
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
                    console.log(req.body.workerID);
        c.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
}



export default { getClocks, clockIn, clockOut };