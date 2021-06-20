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
const faq_1 = __importDefault(require("../models/faq"));
const token_1 = __importDefault(require("../models/token"));
function check_auth(req, must_be_admin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization) {
            return false; //User is not authorized as request does not include a token
        }
        let tok = yield token_1.default.findOne({ token: req.headers.authorization });
        if (tok == null) {
            return false; //User is not authorized as token does not exist
        }
        else if (must_be_admin == true) {
            if (tok.admin == false) {
                return false; //User is not authorized as he is not an admin and has to be one to use that function
            }
        }
        console.log(tok.admin);
        return true; //User is authorized
    });
}
//Obtener todos los usuarios
const getFaqs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, false);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    try {
        const results = yield faq_1.default.find({});
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Obtener 1 usuario a partir del id
const getFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, false);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    try {
        const results = yield faq_1.default.find({ "_id": req.params.id });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Añadir 1 nuevo usuario
const newFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    try {
        let user = new faq_1.default({
            "title": req.body.title,
            "content": req.body.content,
        });
        user.save().then((data) => {
            return res.status(201).json(data);
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const updateFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    if (title != "") {
        faq_1.default.updateMany({ "_id": id }, { $set: { "title": title } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (content != "") {
        faq_1.default.updateMany({ "_id": id }, { $set: { "content": content } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
});
const deleteFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield check_auth(req, true);
    if (!auth) {
        return res.status(401).json({}); //Unauthorized
    }
    try {
        const results = yield faq_1.default.deleteOne({ "title": req.params.title });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Borrar todos los students
exports.default = { getFaqs, getFaq, newFaq, updateFaq, deleteFaq };
