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
const student_1 = __importDefault(require("../models/student"));
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //El await hace que la siguiente linea no se ejecute
    //hasta que el resultado no se haya obtenido
    try {
        const results = yield student_1.default.find({});
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield student_1.default.find({ "_id": req.params.id });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const newStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let student = new student_1.default({
            "name": req.body.name,
            "address": req.body.address,
            "phones": req.body.phones
        });
        student.save().then((data) => {
            return res.status(201).json(data);
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
//Actualizar name/address student segun id
function updateStudent(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const address = req.body.address;
    const phones = req.body.phones;
    student_1.default.update({ "_id": id }, { $set: { "name": name, "address": address } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
//Borrar student segun id
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //El await hace que la siguiente linea no se ejecute
    //hasta que el resultado no se haya obtenido
    try {
        const results = yield student_1.default.deleteOne({ "name": req.params.name });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
//Borrar todos los students
const deleteStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //El await hace que la siguiente linea no se ejecute
    //hasta que el resultado no se haya obtenido
    try {
        const results = yield student_1.default.deleteMany({});
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
exports.default = { getStudents, getStudent, newStudent, updateStudent, deleteStudent, deleteStudents };
