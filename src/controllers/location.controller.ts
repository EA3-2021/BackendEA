import { Request, Response } from "express";
import Location from "../models/location"
import Token from "../models/token";

    //Obtener todos las localizaciones de los usuarios
    const getLocations = async (req: Request, res: Response) => {
        try{
            if (!req.headers.authorization) {
                return res.status(401).json({}); //Unauthorized
            }else if (!Token.findOne({token: req.headers.authorization})) {
                return res.status(401).json({}); //Unauthorized
            }

            const results = await Location.find({});
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }

export default { getLocations };