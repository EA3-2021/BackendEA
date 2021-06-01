import { Request, Response} from "express";
import Report from "../models/report"

//Obtener todos los usuarios
const getReports = async (req: Request, res: Response) => {
    try{
        const results = await Report.find({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}
function getHola(){
    return "Holi"
}
//Obtener 1 usuario a partir del id
const getReport = async (req: Request, res: Response) => {
    try{
        const results = await Report.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo usuario
const newReport = async (req: Request, res: Response) => {
    try{
    let report = new Report({
        "affair" : req.body.affair,
        "description" : req.body.description
    });
    report.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

//Actualizar affair/description report a partir del id
function updateReport (req: Request, res: Response){
    const id: string = req.params.id;
    const affair: string = req.body.affair;
    const description: string = req.body.description;

    if (affair != ""){
        Report.updateMany({"_id": id}, {$set: {"affair": affair}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (description != ""){
        Report.updateMany({"_id": id}, {$set: {"description": description}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }
}

const deleteReport = async (req: Request, res: Response) => {
    try{
        const results = await Report.deleteOne({"affair": req.params.name});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Borrar todos los students
const deleteReports = async (req: Request, res: Response) => {
    try{
        const results = await Report.deleteMany({});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

export default {getReports, getReport, newReport, updateReport, deleteReport, deleteReports, getHola };