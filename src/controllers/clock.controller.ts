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



//Actualizar name/address user a partir del id
function updateClock (req: Request, res: Response){
    const id: string = req.params.id;
    const clockIn: string = req.body.clockIn;
    const clockOut: string = req.body.clockOut;

    let date: Date = new Date();

    //modificar la hora de entrada
    if (clockIn != ""){
        Clock.updateMany({"_id": id}, {$set: {"clockIn": clockIn}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    //modificar la hora de salida
    if (clockOut != ""){
        Clock.updateMany({"_id": id}, {$set: {"clockOut": clockOut}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

}



export default { getClocks, clockIn, updateClock };