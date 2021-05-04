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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function loginAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let admin;
        const name = req.body.name;
        const password = req.body.password;
        admin = yield admin_1.default.findOne({ $or: [{ "name": name }, { "email": name }] });
        if (!admin)
            return res.status(404).json({ message: "User not found" });
        else {
            if (admin.password != password)
                return res.status(409).json({ message: "Password don't match" });
            else {
                try {
                    let t = { token: createToken(admin) };
                    return res.status(200).json(t);
                }
                catch (err) {
                    return res.status(500).json(err);
                }
            }
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
function createToken(admin) {
    const expirationTime = 3600; //1h
    return jsonwebtoken_1.default.sign({ id: admin.id, name: admin.name, email: admin.email }, config_1.default.jwtSecret, {
        expiresIn: expirationTime
    });
}
/*function decodeToken(token: string){
    return jwt.decode(token, {json: true});
}*/
/*async function setOnlineStatus(id: String, value: boolean){
    await User.updateOne({"_id":id}, {$set: {"online":value}});
                    
}*/
exports.default = { loginAdmin, createToken };
