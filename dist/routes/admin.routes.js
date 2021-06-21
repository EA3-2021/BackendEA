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
router.get('/taskall/:fecha/:company', admin_controller_1.default.getTask);
router.delete('/droptask/:id', admin_controller_1.default.deleteTask);
router.put('/updatetask/:id', admin_controller_1.default.updateTask);
router.get('/profile/:companyName', admin_controller_1.default.getAdmin);
router.post('/generate/code/:companyName', admin_controller_1.default.generateCode);
router.get('/getCode/:companyName/:date', admin_controller_1.default.getCode);
router.put('/updateAdminProfile/:companyName', admin_controller_1.default.updateAdminProfile);
// Exportamos router para usar rutas en app.ts
exports.default = router;
