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
const token_1 = __importDefault(require("../models/token"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
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
                    const tokdel = yield token_1.default.deleteMany({ 'workerID': admin.workerID });
                    let t = new token_1.default({ "token": createTokenAdmin(admin), "admin": true, "workerID": admin.workerID });
                    t.save().then((data) => {
                        return res.status(201).json(data);
                    });
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
        const id = yield user_1.default.find({ "workerID": req.body.workerID }, { "_id": 1 });
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
                    return res.status(409).json({ message: "Registration petition don't accepted yet by the Admin" });
                else {
                    token_1.default.deleteMany({ "workerID": workerID });
                    const tokdel = yield token_1.default.deleteMany({ 'workerID': user.workerID });
                    try {
                        let t = new token_1.default({
                            "workerID": user.workerID,
                            "token": createTokenUser(user),
                            "admin": false
                        });
                        t.save().then((data) => {
                            return res.status(201).json(data);
                        });
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
    const expirationTime = 604800; //1 week
    return jsonwebtoken_1.default.sign({ id: admin.id, name: admin.name, email: admin.email }, config_1.default.jwtSecret, {
        expiresIn: expirationTime
    });
}
function createTokenUser(user) {
    const expirationTime = 604800; //1 week
    var token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: expirationTime
    });
    return token;
}
const signoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, false);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    const tokdel = yield token_1.default.deleteMany({ 'token': req.headers.authorization });
    return res.status(200).json({ message: "Usuario desconectado" });
});
exports.default = { loginAdmin, loginUser, createTokenAdmin, createTokenUser, signoutUser };
