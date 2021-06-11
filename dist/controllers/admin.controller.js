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
                let u = new admin_1.default({
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
const getPasswordAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.email);
    let checkEmail = yield admin_1.default.findOne({ "email": req.params.email });
    if (checkEmail) {
        try {
            const results = yield admin_1.default.find({ "email": req.params.email }, { "_id": 0, "password": 1 });
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
            mail.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.status(200).json({ code: 200, message: "Successfully" });
        }
        catch (err) {
            return res.status(404).json(err);
        }
    }
    else {
        return res.status(409).json({ code: 409, message: "This email does not exist" });
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
            "horaF": req.body.horaF
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
        const results = yield tarea_1.default.find({ "fecha": req.params.fecha });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield tarea_1.default.deleteOne({ "titulo": req.params.titulo });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
exports.default = { getPasswordAdmin, registerAdmin, updateConfiguation, getLocations, getAdminName, newTask, getTask, deleteTask };
