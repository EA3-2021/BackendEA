"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.post('/registerUser', user_controller_1.default.registerUser);
router.get('/all/:company', user_controller_1.default.getUsers);
router.get('/:id', user_controller_1.default.getUser);
router.post('/new', user_controller_1.default.newUser);
router.delete('/dropall', user_controller_1.default.deleteUsers);
router.delete('/drop/:name', user_controller_1.default.deleteUser);
router.put('/update/:id', user_controller_1.default.updateUser);
router.post('/newtask', user_controller_1.default.newTask);
router.get('/taskall/:fecha', user_controller_1.default.getTask);
router.delete('/droptask/:titulo', user_controller_1.default.deleteTask);
router.post('/newlocation', user_controller_1.default.newLocation);
router.get('/register/Requests', user_controller_1.default.registerRequests);
router.delete('/drop/registerRequest/:workerID/:email', user_controller_1.default.deleteRegisterRequest);
router.put('/accept/:workerID/:email', user_controller_1.default.acceptRegisterRequest);
router.get('/getPasswordUser/:email', user_controller_1.default.getPasswordUser);
//Exportamos router para usar rutas en app.ts
exports.default = router;
