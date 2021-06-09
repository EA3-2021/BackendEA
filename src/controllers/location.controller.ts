import { Request, Response } from "express";
import Location from "../models/location"

    //Obtener todos las localizaciones de los usuarios
    const getLocations = async (req: Request, res: Response) => {
        try{
            const results = await Location.find({});
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }

export default { getLocations };