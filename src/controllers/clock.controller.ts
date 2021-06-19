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

const newClock = async (req: Request, res: Response) => {

    let clock = req.body;

        let c = new Clock({
            "clockIn": clock.clockIn,
            "latitudIn": clock.latitudIn,
            "longitudIn": clock.longitudIn,
            "clockOut": clock.clockOut,
            "latitudOut": clock.latitudIn,
            "longitudOut": clock.longitudOut
        });

        c.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
    }
}



//Actualizar name/address user a partir del id
function updateClock (req: Request, res: Response){
    const id: string = req.params.id;
    const clockIn: string = req.body.clockIn;
    const latitudeIn: string = req.body.latitudeIn;
    const longitudeIn: string = req.body.longitudeIn;
    const clockOut: string = req.body.clockOut;
    const latitudeOut: string = req.body.latitudeOut;
    const longitudeOut: string = req.body.longitudeOut;

    //modificar la hora de entrada
    if (clockIn != ""){
        Clock.updateMany({"_id": id}, {$set: {"clockIn": clockIn}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }
    //modificar la latitud a la hora de entrada
    if (latitudeIn != ""){
        Clock.updateMany({"_id": id}, {$set: {"latitudeIn": latitudeIn}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }
    //modificar la longitud a la hora de entrada
    if (longitudeIn != ""){
        Clock.updateMany({"_id": id}, {$set: {"longitudeIn": longitudeIn}}).then((data) => {
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

    //modificar la latitud a la hora de salida
    if (latitudeOut != ""){
        Clock.updateMany({"_id": id}, {$set: {"latitudeOut": latitudeOut}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }
    //modificar la longitud a la hora de salida
    if (longitudeOut != ""){
        Clock.updateMany({"_id": id}, {$set: {"longitudeOut": longitudeOut}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }
}



export default { getClocks, newClock, updateClock };