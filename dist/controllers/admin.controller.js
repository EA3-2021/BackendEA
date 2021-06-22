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
const admin_1 = __importDefault(require("../models/admin"));
const user_1 = __importDefault(require("../models/user"));
const location_1 = __importDefault(require("../models/location"));
const configuration_1 = __importDefault(require("../models/configuration"));
const tarea_1 = __importDefault(require("../models/tarea"));
const code_1 = __importDefault(require("../models/code"));
const token_1 = __importDefault(require("../models/token"));
const date_fns_1 = require("date-fns");
function check_auth(req, must_be_admin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization) {
            return false; //User is not authorized as request does not include a token
        }
        try {
            let tok = yield token_1.default.findOne({ token: req.headers.authorization });
            if (tok == null) {
                return false; //User is not authorized as token does not exist
            }
            else if (must_be_admin == true) {
                if (tok.admin == false) {
                    return false; //User is not authorized as he is not an admin and has to be one to use that function
                }
            }
        }
        catch (err) {
            return false; //User is not authorized
        }
        return true; //User is authorized
    });
}
function registerAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let admin = req.body;
        let checkEmail = yield admin_1.default.findOne({ "email": admin.email });
        let checkEmail1 = yield user_1.default.findOne({ "email": admin.email });
        let checkPhone = yield admin_1.default.findOne({ "phone": admin.phone });
        if (checkEmail || checkEmail1)
            return res.status(409).json({ code: 409, message: "This email already exists" });
        else if (checkPhone)
            return res.status(410).json({ code: 410, message: "This phone number already exists" });
        else {
            try {
                var crypto = require('crypto');
                let u = new admin_1.default({
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
                mail.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                u.save().then((data) => {
                    return res.status(201).json(data);
                });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
    });
}
const updateConfiguation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    const configuration = new configuration_1.default({
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
    });
});
//Obtener todos las localizaciones de los usuarios
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    try {
        const results = yield location_1.default.find({});
        console.log(results);
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const getAdminName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Token no tiene que estar porque sirve para el Admin register
    try {
        const results = yield admin_1.default.find({}, { "_id": 0, "name": 1 });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
function generateRandomString(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}
const getPasswordAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let password = generateRandomString(9);
    var crypto = require('crypto');
    let checkEmailadmin = yield admin_1.default.findOne({ "email": req.params.email });
    if (!checkEmailadmin)
        return res.status(409).json({ code: 409, message: "This email does not exist" });
    else {
        admin_1.default.updateMany({ "email": req.params.email }, { $set: { "password": crypto.createHash('sha256').update(password).digest('hex') } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
        try {
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
            mail.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.status(200).json({ code: 200, message: "Email sent successfully" });
        }
        catch (err) {
            return res.status(404).json(err);
        }
    }
});
const newTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //No funciona con token
    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/
    try {
        let tarea = new tarea_1.default({
            "workerID": req.body.workerID,
            "titulo": req.body.titulo,
            "descripcion": req.body.descripcion,
            "fecha": req.body.fecha,
            "horaI": req.body.horaI,
            "horaF": req.body.horaF,
            "company": req.body.company
        });
        tarea.save().then((data) => {
            return res.status(201).json(data);
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, false);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    try {
        const results = yield tarea_1.default.find({ "fecha": req.params.fecha, "company": req.params.company });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    try {
        const results = yield tarea_1.default.deleteOne({ "_id": req.params.id });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Actualizar name/address user a partir del id
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const horaI = req.body.horaI;
    const horaF = req.body.horaF;
    if (titulo != "") {
        tarea_1.default.updateMany({ "_id": id }, { $set: { "titulo": titulo } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (descripcion != "") {
        tarea_1.default.updateMany({ "_id": id }, { $set: { "descripcion": descripcion } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (fecha != "") {
        tarea_1.default.updateMany({ "_id": id }, { $set: { "fecha": fecha } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (horaI != "") {
        tarea_1.default.updateMany({ "_id": id }, { $set: { "horaI": horaI } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (horaF != "") {
        tarea_1.default.updateMany({ "_id": id }, { $set: { "horaF": horaF } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
        return;
    }
});
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    try {
        const results = yield admin_1.default.find({ "name": req.params.companyName });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const generateCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    let date = new Date();
    let fecha = date_fns_1.format(new Date(date), "d-M-yyyy");
    let checkCode = yield code_1.default.findOne({ "company": req.params.companyName, "date": fecha });
    if (checkCode)
        return res.status(409).json({ code: 409, message: "The code is already generated for today" });
    else {
        try {
            let u = new code_1.default({
                "company": req.params.companyName,
                "date": fecha,
                "code": generateRandomString(12)
            });
            u.save().then((data) => {
                return res.status(201).json(data);
            });
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
});
const getCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    try {
        const results = yield code_1.default.find({ "company": req.params.companyName, "date": req.params.date });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const updateAdminProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*const auth = await check_auth(req, true);

    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }*/
    try {
        console.log(req.params.companyName);
        const cif = req.body.cif;
        const name = req.params.companyName;
        const mail = req.body.mail;
        const phone = req.body.phone;
        const password = req.body.password;
        const address = req.body.address;
        const postalCode = req.body.postalCode;
        if (cif != "") {
            admin_1.default.updateMany({ "name": name }, { $set: { "cif": cif } }).then((data) => {
                res.status(201).json(data);
            });
        }
        if (mail != "") {
            admin_1.default.updateMany({ "name": name }, { $set: { "email": mail } }).then((data) => {
                res.status(201).json(data);
            });
        }
        if (phone != "") {
            admin_1.default.updateMany({ "name": name }, { $set: { "phone": phone } }).then((data) => {
                res.status(201).json(data);
            });
        }
        if (password != "") {
            admin_1.default.updateMany({ "name": name }, { $set: { "password": password } }).then((data) => {
                res.status(201).json(data);
            });
        }
        if (address != "") {
            admin_1.default.updateMany({ "name": name }, { $set: { "address": address } }).then((data) => {
                res.status(201).json(data);
            });
        }
        if (postalCode != "") {
            admin_1.default.updateMany({ "name": name }, { $set: { "postalCode": postalCode } }).then((data) => {
                res.status(201).json(data);
            });
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    let user = req.body;
    let checkEmail = yield user_1.default.findOne({ "email": user.email });
    let checkEmail1 = yield admin_1.default.findOne({ "email": user.email });
    let checkPhone = yield user_1.default.findOne({ "phone": user.phone });
    if (checkEmail || checkEmail1)
        return res.status(409).json({ code: 409, message: "This email already exists" });
    else if (checkPhone)
        return res.status(410).json({ code: 410, message: "This phone number already exists" });
    else {
        try {
            var crypto = require('crypto');
            console.log(user.company);
            let u = new user_1.default({
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
            mail.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            u.save().then((data) => {
                return res.status(201).json(data);
            });
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
});
exports.default = { updateAdminProfile, getCode, generateCode, getPasswordAdmin, registerAdmin, updateConfiguation, getLocations, getAdminName, newTask, getTask, deleteTask, updateTask, getAdmin, newUser };
