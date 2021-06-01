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
const report_1 = __importDefault(require("../models/report"));
//Obtener todos los usuarios
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield report_1.default.find({});
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
const getReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield report_1.default.find({ "_id": req.params.id });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Añadir 1 nuevo usuario
const newReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let report = new report_1.default({
            "affair": req.body.affair,
            "description": req.body.description
        });
        report.save().then((data) => {
            return res.status(201).json(data);
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
//Actualizar affair/description report a partir del id
function updateReport(req, res) {
    const id = req.params.id;
    const affair = req.body.affair;
    const description = req.body.description;
    if (affair != "") {
        report_1.default.updateMany({ "_id": id }, { $set: { "affair": affair } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    if (description != "") {
        report_1.default.updateMany({ "_id": id }, { $set: { "description": description } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
}
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield report_1.default.deleteOne({ "affair": req.params.name });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Borrar todos los students
const deleteReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield report_1.default.deleteMany({});
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
exports.default = { getReports, getReport, newReport, updateReport, deleteReport, deleteReports, getHola };
