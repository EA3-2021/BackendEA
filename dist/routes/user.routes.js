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
router.get('/profile/:workerID', user_controller_1.default.getUser);
router.put('/check', user_controller_1.default.checkUser);
router.delete('/drop/:name', user_controller_1.default.deleteUser);
router.put('/update/:id', user_controller_1.default.updateUser);
//router.post('/newtask', userController.newTask);
router.get('/taskall/:workerID/:fecha', user_controller_1.default.getTasks);
//router.delete('/droptask/:titulo',userController.deleteTask);
router.post('/newlocation', user_controller_1.default.newLocation);
router.get('/register/Requests', user_controller_1.default.registerRequests);
router.delete('/drop/registerRequest/:workerID/:email', user_controller_1.default.deleteRegisterRequest);
router.put('/accept/:workerID/:email', user_controller_1.default.acceptRegisterRequest);
router.get('/getPasswordUser/:email', user_controller_1.default.getPasswordUser);
router.post('/holidayRequest', user_controller_1.default.holidayRequest);
router.get('/holidayall/:workerID/:fecha', user_controller_1.default.getHolidays);
router.put('/updateProfile/:workerID', user_controller_1.default.updateProfile);
router.post('/newConfiguration', user_controller_1.default.createConfiguration);
router.put('/updateConfiguration/:workerID', user_controller_1.default.updateConfiguration);
router.get('/locationConfiguration/:workerID', user_controller_1.default.checkLocationConfig);
router.get('/all/:workerID', user_controller_1.default.getUsers);
router.get('/currentConfig/:workerID', user_controller_1.default.getConfigurations);
//router.post('/clockIn', userController.clockIn);
//router.post('/clockOut', userController.clockOut);
//Exportamos router para usar rutas en app.ts
exports.default = router;
