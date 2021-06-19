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
const clock_1 = __importDefault(require("../models/clock"));
const date_fns_1 = require("date-fns");
//Obtener todos las horas de fichar de todos los usuarios a partir de su hora de entrada y compañia
const getClock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.clockIn);
    try {
        const results = yield clock_1.default.find({ "entryDate": req.params.clockIn });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const clockIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let date = new Date();
        let fecha = date_fns_1.format(new Date(date), "d-M-yyyy");
        let hora = date_fns_1.format(new Date(date), "HH:mm");
        let c = new clock_1.default({
            "workerID": req.params.workerID,
            "entryDate": fecha,
            "entryTime": hora,
            "exitDate": "",
            "exitTime": ""
        });
        c.save().then((data) => {
            return res.status(201).json(data);
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const clockOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let date1 = new Date();
    let fecha1 = date_fns_1.format(new Date(date1), "d-M-yyyy");
    let hora1 = date_fns_1.format(new Date(date1), "HH:mm");
    const workerID = req.params.workerID;
    console.log(fecha1);
    console.log(hora1);
    if (fecha1 != "") {
        clock_1.default.updateMany({ "workerID": workerID }, { $set: { "exitDate": fecha1 } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (hora1 != "") {
        clock_1.default.updateMany({ "workerID": workerID }, { $set: { "exitTime": hora1 } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
});
exports.default = { getClock, clockIn, clockOut };
