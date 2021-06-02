"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faq_controller_1 = __importDefault(require("../controllers/faq.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.get('/all', faq_controller_1.default.getFaqs);
router.get('/:id', faq_controller_1.default.getFaq);
router.post('/new', faq_controller_1.default.newFaq);
router.delete('/drop/:title', faq_controller_1.default.deleteFaq);
router.put('/update/:id', faq_controller_1.default.updateFaq);
//Exportamos router para usar rutas en app.ts
exports.default = router;
