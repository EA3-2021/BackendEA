"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const license_controller_1 = __importDefault(require("../controllers/license.controller"));
// Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.post('/obtain', license_controller_1.default.getLicense);
router.post('/use', license_controller_1.default.useLicense);
// Exportamos router para usar rutas en app.ts
exports.default = router;
