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
    const configuration = new configuration_1.default({
        "notification": req.body.notification,
        "private": req.body.private,
        "authentication": req.body.authentication
    });
    configuration.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
});
//Obtener todos las localizaciones de los usuarios
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        const results = yield tarea_1.default.find({ "fecha": req.params.fecha, "company": req.params.company });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield tarea_1.default.deleteOne({ "_id": req.params.id });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Actualizar name/address user a partir del id
function updateTask(req, res) {
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
}
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.companyName);
    try {
        const results = yield admin_1.default.find({ "name": req.params.companyName });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
exports.default = { getPasswordAdmin, registerAdmin, updateConfiguation, getLocations, getAdminName, newTask, getTask, deleteTask, updateTask, getAdmin };
