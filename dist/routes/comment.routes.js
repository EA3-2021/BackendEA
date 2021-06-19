"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.get('/all/:workerID', comment_controller_1.default.getComments);
//router.get('/:id', commentController.getComment);
router.post('/new', comment_controller_1.default.newComment);
//router.delete('/drop/:id',commentController.deleteComment);
router.delete('/drop/:id', comment_controller_1.default.deleteComment);
router.get('/all/admin/:companyName', comment_controller_1.default.getCommentsAdmin);
router.put('/resolve/:id', comment_controller_1.default.resolveComment);
//Exportamos router para usar rutas en app.ts
exports.default = router;
