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
const user_1 = __importDefault(require("../models/user"));
const tarea_1 = __importDefault(require("../models/tarea"));
const location_1 = __importDefault(require("../models/location"));
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = req.body;
        let checkEmail = yield user_1.default.findOne({ "email": user.email });
        let checkPhone = yield user_1.default.findOne({ "phone": user.phone });
        if (checkEmail)
            return res.status(409).json({ code: 409, message: "This email already exists" });
        else if (checkPhone)
            return res.status(410).json({ code: 410, message: "This phone number already exists" });
        else {
            try {
                let u = new user_1.default({
                    "company": user.company,
                    "name": user.name,
                    "email": user.email,
                    "phone": user.phone,
                    "password": user.password,
                    "workerID": generateRandomString(6),
                    "petition": false
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
function generateRandomString(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}
//Obtener todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield user_1.default.find({});
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Obtener 1 usuario a partir del id
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield user_1.default.find({ "_id": req.params.id });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Añadir 1 nuevo usuario
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = new user_1.default({
            "name": req.body.name,
            "email": req.body.email,
            "phone": req.body.phone,
            "password": req.body.password
        });
        user.save().then((data) => {
            return res.status(201).json(data);
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
//Actualizar name/address user a partir del id
function updateUser(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    if (name != "") {
        user_1.default.updateMany({ "_id": id }, { $set: { "name": name } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (email != "") {
        user_1.default.updateMany({ "_id": id }, { $set: { "email": email } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (phone != "") {
        user_1.default.updateMany({ "_id": id }, { $set: { "phone": phone } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (password != "") {
        user_1.default.updateMany({ "_id": id }, { $set: { "password": password } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
        return;
    }
}
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield user_1.default.deleteOne({ "name": req.params.name });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Borrar todos los students
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield user_1.default.deleteMany({});
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const newTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tarea = new tarea_1.default({
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
//Añadir nueva localización de un usuario
const newLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let location = new location_1.default({
            "latitude": req.body.latitude,
            "longitude": req.body.longitude
        });
        location.save().then((data) => {
            return res.status(201).json(data);
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.default = { registerUser, getUsers, getUser, newUser, updateUser, deleteUser, deleteUsers, newTask, newLocation, getTask, deleteTask };
