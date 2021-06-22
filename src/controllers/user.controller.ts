import { Request, Response} from "express";
import User from "../models/user";
import Token from "../models/token";
import Admin from "../models/admin";
import Location from "../models/location";
import Holiday from "../models/holiday";
import Tarea from "../models/tarea";
import Clock from "../models/clock";
import Configuration from "../models/configuration";

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


async function check_self(req: Request, workerID: String) { 

    try {

        let tok = await Token.findOne({token: req.headers.authorization});

        if (tok == null) {
            return false; //User is not authorized as token does not exist

        } else if ((tok.workerID == workerID) || tok.admin) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        return false; //User is not authorized
    }

}

async function registerUser(req:Request, res:Response) {
    let user = req.body;
    let checkEmail = await User.findOne({"email": user.email});
    let checkEmail1 = await Admin.findOne({"email": user.email});
    let checkPhone = await User.findOne({"phone": user.phone});

    if(checkEmail || checkEmail1) return res.status(409).json({code: 409, message: "This email already exists"});
    else if (checkPhone) return res.status(410).json({code: 410, message: "This phone number already exists"});
    else {
        try{

        var crypto = require('crypto');

        let u = new User({
            "company": user.company,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "password": crypto.createHash('sha256').update(user.password).digest('hex'),
            "insignias": [],
            "workerID": generateRandomString(6),
            "petition": false
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

const getUser = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await User.find({"workerID": req.params.workerID});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const updateProfile = async(req: Request, res: Response) => {
    const workerID = req.params.workerID;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    console.log(email);
    console.log(name);
    
    if (name != "") {
        User.updateMany({ "workerID": workerID }, { $set: { "name": name } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }   

    if (email != "") {
        User.updateMany({ "workerID": workerID }, { $set: { "email": email } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (phone != "") {
        User.updateMany({ "workerID": workerID }, { $set: { "phone": phone } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (password != "") {
        User.updateMany({ "workerID": workerID }, { $set: { "password": password } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
        return;
    }
}


//Actualizar name/address user a partir del id
const updateUser = async(req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try {

        const id: string = req.params.id;
        const name: string = req.body.name;
        const email: string = req.body.email;
        const phone: string = req.body.phone;
        const password: string = req.body.password;

        if (name != ""){
            User.updateMany({"_id": id}, {$set: {"name": name}}).then((data) => {
                res.status(201).json(data);
            });
        }
        
        if (email != ""){
            User.updateMany({"_id": id}, {$set: {"email": email}}).then((data) => {
                res.status(201).json(data);
            });
        }

        if (phone != ""){
            User.updateMany({"_id": id}, {$set: {"phone": phone}}).then((data) => {
                res.status(201).json(data);
            });
        }

        if (password != ""){
            User.updateMany({"_id": id}, {$set: {"password": password}}).then((data) => {
                res.status(201).json(data);
            });
        }

    } catch (err) {
        return res.status(500).json(err);
    }

}

const deleteUser = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await User.deleteOne({"name": req.params.name});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const getTasks = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    const sel = await check_self(req, req.params.workerID);

    if (!sel) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await Tarea.find({"workerID": req.params.workerID,"fecha": req.params.fecha});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const getHolidays = async (req: Request, res: Response) => {
    
    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    const sel = await check_self(req, req.params.workerID);

    if (!sel) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await Holiday.find({"workerID": req.params.workerID,"fechaI": req.params.fecha,"estado": true});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}


//Añadir nueva localización de un usuario
const newLocation = async (req: Request, res: Response) => {

    const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        let location = new Location({
            "latitude" : req.body.latitude,
            "longitude" : req.body.longitude
        });
        location.save().then((data) => {
            return res.status(201).json(data);
        });
    } catch(err) {
        return res.status(500).json(err);
    }
}

const registerRequests = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    try{
        const results = await User.find({petition: false});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const deleteRegisterRequest = async (req: Request, res: Response) => {
     
    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

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
        to: req.params.email,
        subject: 'Your registration request has not been accepted!',
        text: 'SORRY!' + '\n' + 'The admin has not accepted your registration request.'
        };
          
        mail.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    try{
        const results = await User.deleteOne({"workerID": req.params.workerID});
        return res.status(200).json(results);

    } catch (err) {
        return res.status(404).json(err);
    }
}

const acceptRegisterRequest = async (req: Request, res: Response) => {

    const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    User.updateOne({"workerID": req.params.workerID}, {$set: {"petition": true}}).then((data) => {
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
            to: req.params.email,
            subject: 'You can access now to your account with your credentials!',
            text: 'WELCOME!' + '\n' + 'The admin has accepted your registration request, access in any time to your account.'
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

const getPasswordUser = async (req: Request, res: Response) => {

    let password = generateRandomString(9);
    var crypto = require('crypto');
    let checkEmailuser = await User.findOne({"email": req.params.email});

    if(!checkEmailuser) return res.status(409).json({code: 409, message: "This email does not exist"});
    else{
    User.updateMany({"email": req.params.email}, {$set: {"password": crypto.createHash('sha256').update(password).digest('hex')}}).then((data) => {
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
                to: checkEmailuser.email,
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

const holidayRequest = async (req: Request, res: Response) => {

    /*const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    const sel = await check_self(req, req.body.workerID);

    if (!sel) {
        return res.status(401).json({}); //Unauthorized
    }*/

    let results = await User.findOne({"workerID": req.body.workerID});
    if(results){  
        try{
            let holiday = new Holiday({
                "company": results.company,
                "workerID": req.body.workerID,
                "motivo" : req.body.motivo,
                "descripcion" : req.body.descripcion,
                "fechaI" : req.body.fechaI,
                "fechaF" : req.body.fechaF,
                "estado": false
            });

            holiday.save().then((data) => {
                return res.status(201).json(data);
            });
        }
        catch(err) {
            return res.status(500).json(err);
        }
    }else{
        return res.status(409).json({code: 409, message: "This user does not exist"});
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

const updateConfiguation = async (req: Request, res: Response) => {
    
    /*const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }

    const sel = await check_self(req, req.body.workerID);

    if (!sel) {
        return res.status(401).json({}); //Unauthorized
    }*/

    const resultado = await User.find({"workerID": req.body.workerID},{ "_id": 0, "company": 1});
   
    const configuration = new Configuration({
        "company": resultado[0].company,
        "workerID": req.body.workerID,
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

const getConfigurations = async (req: Request, res: Response) => {

    try{
        const results = await Configuration.find({"workerID": req.params.workerID});
        console.log(results[0].location);
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const checkLocationConfig = async (req: Request, res: Response) => {

    /*const auth = await check_auth(req, false);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/
    const results = await Configuration.find({"workerID": req.params.workerID});

    if(results[0].location == !1) return res.status(409).json({code: 409, message: "Activate the location first in settings!"});
    else {
        return res.status(200).json({code: 200, message: "Puedes fichar!"});
    }
}

export default {updateConfiguation, updateProfile, getHolidays, getTasks, getPasswordUser, acceptRegisterRequest, deleteRegisterRequest, registerRequests, registerUser, getUsers, getUser, updateUser, deleteUser,
newLocation, getWorkerID, holidayRequest, getConfigurations, checkLocationConfig};
