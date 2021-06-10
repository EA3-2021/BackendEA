import { Request, Response } from "express";
import Admin from "../models/admin";
import License from "../models/license"
import Location from "../models/location"
import Configuration from "../models/configuration"

    async function registerAdmin(req:Request, res:Response) {
        let admin = req.body;
        let checkEmail = await Admin.findOne({"email": admin.email});
        let checkPhone = await Admin.findOne({"phone": admin.phone});
    
        if(checkEmail) return res.status(409).json({code: 409, message: "This email already exists"});
        else if (checkPhone) return res.status(410).json({code: 410, message: "This phone number already exists"});
        else {
            try{

            let u = new Admin({
                "name": admin.name,
                "email": admin.email,
                "cif": admin.cif,
                "address": admin.address,
                "postalCode": admin.postalCode,
                "phone": admin.phone,
                "password": admin.password
            });
            u.save().then((data) => {
                return res.status(201).json(data);
            });
            } catch(err) {
                return res.status(500).json(err);
            }
        }
    }
    
    const updateConfiguation = async (req: Request, res: Response) => {
        const configuration = new Configuration({
            "notification": req.body.notification,
            "private": req.body.private,
            "authentication": req.body.authentication
        });
        configuration.save().then((data) => {
            return res.status(201).json(data);
        }).catch((err) => {
            return res.status(500).json(err);
        })
    }

    //Obtener todos las localizaciones de los usuarios
    const getLocations = async (req: Request, res: Response) => {
        try{
            const results = await Location.find({});
            console.log(results);
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }

    const getAdminName = async (req: Request, res: Response) => {
        try{
            const results = await Admin.find({}, { "_id": 0, "name": 1});
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }

    
export default {registerAdmin, updateConfiguation, getLocations, getAdminName};
