"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = __importDefault(require("../controllers/report.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.get('/all', report_controller_1.default.getReports);
router.get('/:id', report_controller_1.default.getReport);
router.post('/new', report_controller_1.default.newReport);
router.delete('/dropall', report_controller_1.default.deleteReports);
router.delete('/drop/:affair', report_controller_1.default.deleteReport);
router.put('/update/:id', report_controller_1.default.updateReport);
router.get('/hola', report_controller_1.default.getHola);
//Exportamos router para usar rutas en app.ts
exports.default = router;
