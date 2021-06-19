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
const admin_1 = __importDefault(require("../models/admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
let t;
function loginAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let admin;
        const name = req.body.name;
        const password = req.body.password;
        var crypto = require('crypto');
        let encryptedPass = crypto.createHash('sha256').update(password).digest('hex');
        admin = yield admin_1.default.findOne({ $or: [{ "name": name }, { "email": name }] });
        if (!admin)
            return res.status(404).json({ message: "Wrong credentials, try it again. Incorrect Business name." });
        else {
            if (admin.password != encryptedPass)
                return res.status(409).json({ message: "Wrong credentials, try it again. Incorrect password." });
            else {
                try {
                    let t = { token: createTokenAdmin(admin), _id: admin._id };
                    return res.status(200).json(t);
                }
                catch (err) {
                    return res.status(500).json(err);
                }
            }
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        const workerID = req.body.workerID;
        const password = req.body.password;
        var crypto = require('crypto');
        let encryptedPass = crypto.createHash('sha256').update(password).digest('hex');
        user = yield user_1.default.findOne({ "workerID": workerID });
        if (!user)
            return res.status(404).json({ message: "Wrong credentials, try it again. Incorrect Worker ID." });
        else {
            if (user.password != encryptedPass)
                return res.status(409).json({ message: "Wrong credentials, try it again. Incorrect password." });
            else {
                if (user.petition == false)
                    return res.status(409).json({ message: "Registrartion petition don't accepted yet by the Admin" });
                else {
                    try {
                        t = createTokenUser(user);
                        return res.status(200).json(t);
                    }
                    catch (err) {
                        return res.status(500).json(err);
                    }
                }
            }
        }
    });
}
function createTokenAdmin(admin) {
    const expirationTime = 3600; //1h
    return jsonwebtoken_1.default.sign({ id: admin.id, name: admin.name, email: admin.email }, config_1.default.jwtSecret, {
        expiresIn: expirationTime
    });
}
function createTokenUser(user) {
    const expirationTime = 3600; //1h
    return jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: expirationTime
    });
}
function decodeToken(token) {
    return jsonwebtoken_1.default.decode(token, { json: true });
}
function signoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(t);
        let t1 = decodeToken(req.body.token);
        let user = yield user_1.default.findOne({ "_id": t1 === null || t1 === void 0 ? void 0 : t1.id });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        else {
            return res.status(200).json({ message: "Usuario desconectado" });
        }
    });
}
/*async function setOnlineStatus(id: String, value: boolean){
    await User.updateOne({"_id":id}, {$set: {"online":value}});
                    
}*/
exports.default = { loginAdmin, loginUser, createTokenAdmin, createTokenUser, signoutUser };
