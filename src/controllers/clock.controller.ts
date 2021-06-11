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

    //Obtener las horas de fichar de un usuario

    //Obtener las horas de entrada de un usuario    (clockIn)

    //Obtener las horas de salida de un usuario    (clockOut)



export default { getClocks };