import { Request, Response} from "express";
import LicenseSchema from "../models/license"

//Obtener 1 usuario a partir del id
const getLicense = async (req: Request, res: Response) => {

    try{
        let license = new LicenseSchema({
            "licenseCode" : generateRandomString(12)
        });

        var nodemailer = require('nodemailer');

        var mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'firefighteradventure@gmail.com',
              pass: 'Mazinger72'
            }
          });

          var mailOptions = {
            from: 'firefighteradventure@gmail.com',
            to: req.body.email,
            subject: 'Here it is your license code!',
            text: license.licenseCode
          };
          
          mail.sendMail(mailOptions, function(error: any, info: any){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        license.save().then((data) => {
            return res.status(201).send({});
        });
        } catch(err) {
            return res.status(500).json(err);
        }

}

const useLicense = async(req: Request, res: Response) => {

    try{
        const results = await LicenseSchema.findOne({"licenseCode": req.body.licenseCode});

        if (results) {
            return res.status(200).send({});
        } else {
            return res.status(404).send({});
        }
        
    } catch (err) {
        return res.status(404).json(err);
    }
    
}

function generateRandomString(length: number) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

export default {getLicense, useLicense};