"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
// Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.post('/register-admin', admin_controller_1.default.registerAdmin);
router.post('/configuration', admin_controller_1.default.updateConfiguation);
router.get('/getLocations', admin_controller_1.default.getLocations);
router.get('/getAdminName', admin_controller_1.default.getAdminName);
router.get('/getPasswordAdmin/:email', admin_controller_1.default.getPasswordAdmin);
router.post('/newtask', admin_controller_1.default.newTask);
router.get('/taskall/:fecha', admin_controller_1.default.getTask);
router.delete('/droptask/:titulo', admin_controller_1.default.deleteTask);
// Exportamos router para usar rutas en app.ts
exports.default = router;
