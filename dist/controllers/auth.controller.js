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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        const name = req.body.name;
        const password = req.body.password;
        user = yield user_1.default.findOne({ $or: [{ "name": name }, { "email": name }] });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        else {
            if (user.password != password)
                return res.status(409).json({ message: "Password don't match" });
            else {
                try {
                    let t = { token: createToken(user) };
                    return res.status(200).json(t);
                }
                catch (err) {
                    return res.status(500).json(err);
                }
            }
        }
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = req.body;
        let checkUsername = yield user_1.default.findOne({ "username": user.name });
        let checkEmail = yield user_1.default.findOne({ "email": user.email });
        if (checkUsername)
            return res.status(409).json({ code: 409, message: "Username already exists" });
        else if (checkEmail)
            return res.status(410).json({ code: 410, message: "Email already exists" });
        else {
            let u = new user_1.default({
                "name": user.name,
                "email": user.email,
                "birthdate": user.birthdate,
                "password": user.password
            });
            u.save().then((data) => {
                /*let userToSend = {
                    username: u.name
                }
                const io = require('../sockets/socket').getSocket();
                io.emit('nuevoUsuario', userToSend);*/
                return res.status(201).json({ token: createToken(data) });
            }).catch((err) => {
                return res.status(500).json(err);
            });
        }
    });
}
/*async function signout(req:Request, res:Response){
    let t = decodeToken(req.body.token);
    let user = await User.findOne({"_id": t?.id});
    if(!user) return res.status(404).json({message: "User not found"});
    else {
        return res.status(200).json({message: "Usuario desconectado"});
    }
}*/
function createToken(user) {
    const expirationTime = 3600; //1h
    return jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: expirationTime
    });
}
function decodeToken(token) {
    return jsonwebtoken_1.default.decode(token, { json: true });
}
/*async function setOnlineStatus(id: String, value: boolean){
    await User.updateOne({"_id":id}, {$set: {"online":value}});
                    
}*/
function checkemail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let email = req.params.email;
        yield user_1.default.findOne({ 'email': email }).then((data) => {
            if (data)
                return res.status(200).json({ value: true });
            else
                return res.status(200).json({ value: false });
        });
    });
}
exports.default = { login, register, createToken, checkemail };
