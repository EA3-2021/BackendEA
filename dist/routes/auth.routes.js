"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
// Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.post('/login-admin', auth_controller_1.default.loginAdmin);
router.post('/loginUser', auth_controller_1.default.loginUser);
router.put('/signoutUser/:token', auth_controller_1.default.signoutUser);
// Exportamos router para usar rutas en app.ts
exports.default = router;
