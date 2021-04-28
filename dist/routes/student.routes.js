"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = __importDefault(require("../controllers/student.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
/*
- listado de asignaturas (CU_1)
- añadir alumno en una asignatura (CU_2)
- ver detalle de una asignatura (CU_3)
- ver detalle de un alumno dentro de una asignatura (CU_4)*/
router.get('/all', student_controller_1.default.getStudents);
router.get('/:id', student_controller_1.default.getStudent);
router.post('/new', student_controller_1.default.newStudent);
router.delete('/dropall', student_controller_1.default.deleteStudents);
router.delete('/drop/:name', student_controller_1.default.deleteStudent);
router.put('/update/:id', student_controller_1.default.updateStudent);
//Exportamos router para usar rutas en app.ts
exports.default = router;
