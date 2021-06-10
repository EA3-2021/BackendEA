"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.get('/all', message_controller_1.default.getMessages);
router.get('/:name', message_controller_1.default.getMessage);
router.post('/new', message_controller_1.default.newMessage);
//router.delete('/drop/:id',messageController.deleteMessage);
//Exportamos router para usar rutas en app.ts
exports.default = router;
