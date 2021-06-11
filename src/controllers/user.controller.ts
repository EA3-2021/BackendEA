import { Request, Response} from "express";
import User from "../models/user";
import Admin from "../models/admin";
import Tarea from "../models/tarea";
import Location from "../models/location";
import Holiday from "../models/holiday";
import Clock from "../models/clock";


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
            subject: 'Here it is your Worker ID and your password!',
            text: 'Your worker ID:' + u.workerID + '\n' + 'Your password:' + u.password + '\n' + '\n' + 'REMEMBER!' + '\n' + 'The admin has to accept your registration first before logging in, wait for the acceptance email.'
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
    try{
        const results = await User.find({"company": req.params.company});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Obtener 1 usuario a partir del id
const getUser = async (req: Request, res: Response) => {
    try{
        const results = await User.find({"_id": req.params.id});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

//Añadir 1 nuevo usuario
const newUser = async (req: Request, res: Response) => {
    try{
    let user = new User({
        "name" : req.body.name,
        "email" : req.body.email,
        "phone" : req.body.phone,
        "password" : req.body.password
    });
    user.save().then((data) => {
        return res.status(201).json(data);
    });
    } catch(err) {
        return res.status(500).json(err);
    }
}

//Actualizar name/address user a partir del id
function updateUser (req: Request, res: Response){
    const id: string = req.params.id;
    const name: string = req.body.name;
    const email: string = req.body.email;
    const phone: string = req.body.phone;
    const password: string = req.body.password;

    if (name != ""){
        User.updateMany({"_id": id}, {$set: {"name": name}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (email != ""){
        User.updateMany({"_id": id}, {$set: {"email": email}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (phone != ""){
        User.updateMany({"_id": id}, {$set: {"phone": phone}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    if (password != ""){
        User.updateMany({"_id": id}, {$set: {"password": password}}).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
        return;
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try{
        const results = await User.deleteOne({"name": req.params.name});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

/*const newTask = async (req: Request, res: Response) => {
    try{
    let tarea = new Tarea({
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
}*/


//Añadir nueva localización de un usuario
const newLocation = async (req: Request, res: Response) => {
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
    try{
        const results = await User.find({petition: false});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const deleteRegisterRequest = async (req: Request, res: Response) => {

    console.log (req.params.email);

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
    
    console.log(req.body.email);
    console.log(req.params.email);

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
        
    console.log(req.params.email);
    let checkEmail = await User.findOne({"email": req.params.email});
    if(checkEmail){
        try{
            const results = await User.find({"email": req.params.email},{ "_id": 0, "password": 1});
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

const holidayRequest = async (req: Request, res: Response) => {

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
        try{
            const results = await User.find({"company": req.params.company}, { "_id": 0, "workerID": 1});
            return res.status(200).json(results);
        } catch (err) {
            return res.status(404).json(err);
        }
    }
/*
    //Fichar entrada trabajo
    const clockIn = async (req: Request, res: Response) => {
        try{
        let clock = new clock({
            "clockIn" : req.body.clockIn
        });
        clockIn.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
    }

    //Fichar salida trabajo
    const clockOut = async (req: Request, res: Response) => {
        try{
        let clock = new clock({
            "clockout" : req.body.clockOut
        });
        clockOut.save().then((data) => {
            return res.status(201).json(data);
        });
        } catch(err) {
            return res.status(500).json(err);
        }
    }
*/

const getHolidayPending = async (req: Request, res: Response) => {
    try{
        const results = await Holiday.find({"company": req.params.company, "estado": false});
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

export default {getHolidayPending, getPasswordUser, acceptRegisterRequest, deleteRegisterRequest, registerRequests, registerUser, getUsers, getUser, newUser, updateUser, deleteUser,
newLocation, getWorkerID, holidayRequest /*,clockIn, clockOut*/};
