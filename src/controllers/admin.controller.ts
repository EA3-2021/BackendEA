import { Request, Response } from "express";
import Admin from "../models/admin";
import User from "../models/user";
import Location from "../models/location";
import Configuration from "../models/configuration";
import Tarea from "../models/tarea";
import Code from "../models/code";
import Token from "../models/token";
import {format} from "date-fns";
import Holiday from "../models/holiday";

async function check_auth(req: Request, must_be_admin: Boolean) { 

    if (!req.headers.authorization) {
        return false; //User is not authorized as request does not include a token
    } 

    try {

        let tok = await Token.findOne({token: req.headers.authorization});

        if (tok == null) {
            return false; //User is not authorized as token does not exist

        } else if (must_be_admin == true){

            if (tok.admin == false) {

                return false; //User is not authorized as he is not an admin and has to be one to use that function

            }
            
        }

    } catch (err) {
        return false; //User is not authorized
    }

    return true; //User is authorized

}

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
            "workerID": generateRandomString(6),
            "email": admin.email,
            "cif": admin.cif,
            "address": admin.address,
            "postalCode": admin.postalCode,
            "phone": admin.phone,
            "password": crypto.createHash('sha256').update(admin.password).digest('hex')
        });

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
        to: admin.email,
        subject: 'Here it is your Username and your password!',
        text: 'Your username:' + admin.name + '\n' + 'Your password:' + admin.password + '\n' + '\n' + 'WELCOME!' + '\n' + 'You can now start customizing the app for your workers'
        };
        
        mail.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
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

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    const configuration = new Configuration({
        "company": req.body.company,
        "notification": req.body.notification,
        "private": req.body.private,
        "authentication": req.body.authentication,
        "location": req.body.location
    });
    configuration.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

//Obtener todos las localizaciones de los usuarios
const getLocations = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await Location.find({});
        console.log(results);
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const getAdminName = async (req: Request, res: Response) => {

    //Token no tiene que estar porque sirve para el Admin register
    
    try{
        const results = await Admin.find({}, { "_id": 0, "name": 1});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

function generateRandomString(length: number) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
    charactersLength)));
    }
    return result.join('');
}

const getPasswordAdmin = async (req: Request, res: Response) => {

    let password = generateRandomString(9);
    var crypto = require('crypto');
    let checkEmailadmin = await Admin.findOne({"email": req.params.email});

    if(!checkEmailadmin) return res.status(409).json({code: 409, message: "This email does not exist"});
    else{
    Admin.updateMany({"email": req.params.email}, {$set: {"password": crypto.createHash('sha256').update(password).digest('hex')}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
        try{
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
                to: checkEmailadmin.email,
                subject: 'Forgot your password? Here you have the new one!',
                text: 'New Password: ' + password
            };
        
            mail.sendMail(mailOptions, function(error: any, info: any){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });

            return res.status(200).json({code: 200, message: "Email sent successfully"});

        }catch (err) {
            return res.status(404).json(err);
        } 
    }
}

const newTask = async (req: Request, res: Response) => {

    //No funciona con token

    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/

    try{
        let tarea = new Tarea({
            "workerID" : req.body.workerID,
            "titulo" : req.body.titulo,
            "descripcion" : req.body.descripcion,
            "fecha":req.body.fecha,
            "horaI" : req.body.horaI,
            "horaF" : req.body.horaF,
            "company" : req.body.company
        });
        tarea.save().then((data) => {
            return res.status(201).json(data);
        });
    } catch(err) {
        return res.status(500).json(err);
    }

}

const getTask = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await Tarea.find({"fecha": req.params.fecha, "company": req.params.company });
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }

}

const deleteTask = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await Tarea.deleteOne({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Actualizar name/address user a partir del id
const updateTask = async (req: Request, res: Response) => {

    const id: string = req.params.id;
    const titulo: string = req.body.titulo;
    const descripcion: string = req.body.descripcion;
    const fecha: string = req.body.fecha;
    const horaI: string = req.body.horaI;
    const horaF: string = req.body.horaF;

    if (titulo != ""){
        Tarea.updateMany({"_id": id}, {$set: {"titulo": titulo}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (descripcion != ""){
        Tarea.updateMany({"_id": id}, {$set: {"descripcion": descripcion}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (fecha != ""){
        Tarea.updateMany({"_id": id}, {$set: {"fecha": fecha}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (horaI != ""){
        Tarea.updateMany({"_id": id}, {$set: {"horaI": horaI}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (horaF != ""){
        Tarea.updateMany({"_id": id}, {$set: {"horaF": horaF}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
        return;
    }
}

const getAdmin = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await Admin.find({"name": req.params.companyName});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }

}

const generateCode = async (req:Request, res:Response) => {

    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/

    let date: Date = new Date();
    let fecha = format(new Date(date), "d-M-yyyy");
    let checkCode = await Code.findOne({"company": req.params.companyName, "date": fecha});

    if(checkCode) return res.status(409).json({code: 409, message: "The code is already generated for today"});
    else {
        try{  
            let u = new Code({
                "company": req.params.companyName,
                "date": fecha,
                "code": generateRandomString(12)
            });

            u.save().then((data) => {
                return res.status(201).json(data);
                });
        } catch(err) {
            return res.status(500).json(err);
        }
    }
}

const getCode = async (req: Request, res: Response) => {

    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/
    
    try{
        const results = await Code.find({"company": req.params.companyName, "date": req.params.date});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const updateAdminProfile = async(req: Request, res: Response) => {

    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/

    try {

        console.log(req.params.companyName);

        const cif: string = req.body.cif;
        const name: string = req.params.companyName;
        const mail: string = req.body.mail;
        const phone: string = req.body.phone;
        const password: string = req.body.password;
        const address: string = req.body.address;
        const postalCode: string = req.body.postalCode;

        if (cif != ""){
            Admin.updateMany({"name": name}, {$set: {"cif": cif}}).then((data) => {
                res.status(201).json(data);
            });
        }

        if (mail != ""){
            Admin.updateMany({"name": name}, {$set: {"email": mail}}).then((data) => {
                res.status(201).json(data);
            });
        }
        
        if (phone != ""){
            Admin.updateMany({"name": name}, {$set: {"phone": phone}}).then((data) => {
                res.status(201).json(data);
            });
        }

        if (password != ""){
            Admin.updateMany({"name": name}, {$set: {"password": password}}).then((data) => {
                res.status(201).json(data);
            });
        }

        if (address != ""){
            Admin.updateMany({"name": name}, {$set: {"address": address}}).then((data) => {
                res.status(201).json(data);
            });
        }

        if (postalCode != ""){
            Admin.updateMany({"name": name}, {$set: {"postalCode": postalCode}}).then((data) => {
                res.status(201).json(data);
            });
        }

    } catch (err) {
        return res.status(500).json(err);
    }

}

const newUser = async (req: Request, res: Response) => {
 
    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/

    let user = req.body;
    let checkEmail = await User.findOne({"email": user.email});
    let checkEmail1 = await Admin.findOne({"email": user.email});
    let checkPhone = await User.findOne({"phone": user.phone});

    if(checkEmail || checkEmail1) return res.status(409).json({code: 409, message: "This email already exists"});
    else if (checkPhone) return res.status(410).json({code: 410, message: "This phone number already exists"});
    else {
        try{

        var crypto = require('crypto');
        console.log(user.company);

        let u = new User({
            "company": user.company,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "password": crypto.createHash('sha256').update(user.password).digest('hex'),
            "insignias": [],
            "workerID": generateRandomString(6),
            "petition": true
        });

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
            to: user.email,
            subject: 'Welcome ' + u.name + '! Here it is your Worker ID and your password!',
            text: 'Your worker ID:' + u.workerID + '\n' + 'Your password:' + user.password + '\n' + '\n' + 'REMEMBER!' + '\n' + 'The admin has to accept your registration first before logging in, wait for the acceptance email.'
          };
          
          mail.sendMail(mailOptions, function(error: any, info: any){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });

        u.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
    }
}

const getHolidayPending = async (req: Request, res: Response) => {
    
    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/

    try{
        const results = await Holiday.find({"company": req.params.company, "estado": false});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }

}

const acceptHoliday = async (req: Request, res: Response) => {
        
    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/

    const results = await Holiday.find({"_id": req.params.id},{ "_id": 0, "workerID": 1});
    const resultado = await User.find({"workerID": results[0].workerID},{ "_id": 0, "email": 1});

    Holiday.updateOne({"_id": req.params.id}, {$set: {"estado": true}}).then((data) => {
        res.status(201).json(data);

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
            to: resultado[0].email,
            subject: 'Holiday request resolution!',
            text: 'ACCEPTED!' + '\n' + 'your vacation has been APPROVED'
          };
          
          mail.sendMail(mailOptions, function(error: any, info: any){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });

    }).catch((err) => {
        res.status(500).json(err);
    })
    
}

const refuseHoliday = async (req: Request, res: Response) => {

    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/

    const results = await Holiday.find({"_id": req.params.id},{ "_id": 0, "workerID": 1});
    const resultado = await User.find({"workerID": results[0].workerID},{ "_id": 0, "email": 1});
    console.log(resultado[0].email)

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
        to: resultado[0].email,
        subject: 'Holiday request resolution!',
        text: 'SORRY!' + '\n' + 'your vacation has been denied'
        };
          
        mail.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    try{
        const results = await Holiday.deleteOne({"_id": req.params.id});
        return res.status(200).json(results);

    } catch (err) {
        return res.status(404).json(err);
    }
}

//Obtener todos los usuarios
const getUsers = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await User.find({"company": req.params.company});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const getWorkerID = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await User.find({"company": req.params.company}, { "_id": 0, "workerID": 1});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }

}
    
    
export default {updateAdminProfile, getCode, generateCode, getPasswordAdmin, registerAdmin, updateConfiguation, getLocations, 
    getAdminName, newTask, getTask, deleteTask, updateTask, getAdmin, newUser, refuseHoliday, acceptHoliday, getHolidayPending,
    getUsers, getWorkerID};
