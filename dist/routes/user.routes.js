"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.get('/all', user_controller_1.default.getUsers);
router.get('/:id', user_controller_1.default.getUser);
router.post('/new', user_controller_1.default.newUser);
router.delete('/dropall', user_controller_1.default.deleteUsers);
router.delete('/drop/:name', user_controller_1.default.deleteUser);
router.put('/update/:id', user_controller_1.default.updateUser);
//Exportamos router para usar rutas en app.ts
exports.default = router;
