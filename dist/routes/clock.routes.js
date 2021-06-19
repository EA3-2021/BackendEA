"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clock_controller_1 = __importDefault(require("../controllers/clock.controller"));
// Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.get('/getClocks', clock_controller_1.default.getClocks);
router.post('/clockIn', clock_controller_1.default.clockIn);
router.put('/clockOut', clock_controller_1.default.clockOut);
// Exportamos router para usar rutas en app.ts
exports.default = router;
