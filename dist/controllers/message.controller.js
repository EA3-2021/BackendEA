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
const message_1 = __importDefault(require("../models/message"));
//Obtener todos los mensajes
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield message_1.default.find({});
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Obtener 1 mensaje a partir del id
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield message_1.default.find({ "_id": req.params.id });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Añadir 1 nuevo mensaje
const newMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message = new message_1.default({
            "msg": req.body.msg
        });
        message.save().then((data) => {
            return res.status(201).json(data);
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield message_1.default.deleteOne({ "msg": req.params.msg });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
exports.default = { getMessages, getMessage, newMessage, deleteMessage };
