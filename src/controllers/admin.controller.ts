import { Request, Response } from "express";
import Admin from "../models/admin";
import User from "../models/user";
import Location from "../models/location";
import Configuration from "../models/configuration";
import Tarea from "../models/tarea";

    async function registerAdmin(req:Request, res:Response) {
        let admin = req.body;
        let checkEmail = await Admin.findOne({"email": admin.email});
        let checkEmail1 = await User.findOne({"email": admin.email});
        let checkPhone = await Admin.findOne({"phone": admin.phone});
    
        if(checkEmail || checkEmail1) return res.status(409).json({code: 409, message: "This email already exists"});
        else if (checkPhone) return res.status(410).json({code: 410, message: "This phone number already exists"});
        else {
            try{

            var crypto = require('crypto');

            let u = new Admin({
                "name": admin.name,
                "email": admin.email,
                "cif": admin.cif,
                "address": admin.address,
                "postalCode": admin.postalCode,
                "phone": admin.phone,
                "password": crypto.createHash('sha256').update(admin.password).digest('hex')
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

    const getPasswordAdmin = async (req: Request, res: Response) => {
        
        console.log(req.params.email);
        let checkEmail = await Admin.findOne({"email": req.params.email});
        if(checkEmail){
            try{
                const results = await Admin.find({"email": req.params.email},{ "_id": 0, "password": 1});
                console.log(results);
                var nodemailer = require('nodemailer');

                var mail = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'firefighteradventure@gmail.com',
                        pass: 'Mazinger72'
                    }
                });

                var mailOptions = {
                    from: 'firefighteradventure@gmail.com',
                    to: checkEmail.email,
                    subject: 'Password has been recovered',
                    text: 'Your Password: ' + results
                };
          
                mail.sendMail(mailOptions, function(error: any, info: any){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });

                return res.status(200).json({code: 200, message: "Successfully"});

            }catch (err) {
                return res.status(404).json(err);
            }
        }else{
            return res.status(409).json({code: 409, message: "This email does not exist"});
        }   
    }

    const newTask = async (req: Request, res: Response) => {
        try{
        let tarea = new Tarea({
            "workerID" : req.body.workerID,
            "titulo" : req.body.titulo,
            "descripcion" : req.body.descripcion,
            "fecha":req.body.fecha,
            "horaI" : req.body.horaI,
            "horaF" : req.body.horaF
        });
        tarea.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
    }
    
    const getTask = async (req: Request, res: Response) => {
        try{
            const results = await Tarea.find({"fecha": req.params.fecha});
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }
    
    const deleteTask = async (req: Request, res: Response) => {
        try{
            const results = await Tarea.deleteOne({"titulo": req.params.titulo});
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }
    

    
export default {getPasswordAdmin, registerAdmin, updateConfiguation, getLocations, getAdminName, newTask, getTask, deleteTask};
