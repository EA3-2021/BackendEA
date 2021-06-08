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
function getHola() {
    return "Holi";
}
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
exports.default = { getUsers, getUser, newUser, updateUser, deleteUser, deleteUsers, getHola };
