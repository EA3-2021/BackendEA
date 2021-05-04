"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
// Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.post('/register', admin_controller_1.default.register);
router.post('/license', admin_controller_1.default.newLicense);
router.get('/:licenseCode', admin_controller_1.default.checklicense);
// Exportamos router para usar rutas en app.ts
exports.default = router;
