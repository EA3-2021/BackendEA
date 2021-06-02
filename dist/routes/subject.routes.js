"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_controller_1 = __importDefault(require("../controllers/subject.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
/*
- listado de asignaturas (CU_1)
- añadir alumno en una asignatura (CU_2)
- ver detalle de una asignatura (CU_3)
- ver detalle de un alumno dentro de una asignatura (CU_4)*/
router.get('/all', subject_controller_1.default.getSubjects);
router.get('/:id', subject_controller_1.default.getSubject);
router.post('/new', subject_controller_1.default.addSubject);
router.post('/newStudent/:subjectName', subject_controller_1.default.addStudentToSubject);
//Exportamos router para usar rutas en app.ts
exports.default = router;
