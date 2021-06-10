"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("../controllers/chat.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.get('/all', chat_controller_1.default.getChats);
router.get('/:name', chat_controller_1.default.getChat);
router.post('/new', chat_controller_1.default.newChat);
//router.delete('/drop/:id',chatController.deleteChat);
//Exportamos router para usar rutas en app.ts
exports.default = router;
