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
const subject_1 = __importDefault(require("../models/subject"));
const student_1 = __importDefault(require("../models/student"));
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield subject_1.default.find({}).populate('students');
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const getSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield subject_1.default.find({ "_id": req.params.id }).populate('students');
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const addStudentToSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let subjectName = req.params.subjectName;
    let studentName = req.body.name;
    let studentAddress = req.body.address;
    let studentPhones = req.body.phones;
    let s = yield student_1.default.findOne({ name: studentName });
    if (!s) {
        let student = new student_1.default({ "name": studentName, "address": studentAddress, "phones": studentPhones });
        console.log("Student new: ", student);
        yield student.save().then((data) => {
            s = data;
        });
    }
    yield subject_1.default.updateOne({ "name": subjectName }, { $addToSet: { students: s === null || s === void 0 ? void 0 : s._id } }).then(data => {
        if (data.nModified == 1) {
            console.log("Student added successfully");
            res.status(201).send({ message: 'Student added successfully' });
        }
        else {
            res.status(409).json('Student already exists!!!');
        }
    }).catch((err) => {
        console.log("error ", err);
        res.status(500).json(err);
    });
});
const addSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = new subject_1.default({
        "name": req.body.name,
        "students": []
    });
    subject.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
});
exports.default = { getSubjects, getSubject, addStudentToSubject, addSubject };
