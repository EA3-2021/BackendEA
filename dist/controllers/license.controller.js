"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const license_1 = __importDefault(require("../models/license"));
//Obtener 1 usuario a partir del id
const getLicense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let license = new license_1.default({
            "licenseCode": generateRandomString(12)
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
        mail.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        license.save().then((data) => {
            return res.status(201).send({});
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const useLicense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield license_1.default.findOne({ "licenseCode": req.body.licenseCode });
        if (results) {
            return res.status(200).send({});
        }
        else {
            return res.status(404).send({});
        }
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
function generateRandomString(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}
exports.default = { getLicense, useLicense };
