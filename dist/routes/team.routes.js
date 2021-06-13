"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = __importDefault(require("../controllers/team.controller"));
//Router nos permite gestionar rutas de la API
const router = express_1.Router();
router.get('/all/:companyName', team_controller_1.default.getTeams);
router.get('/:id', team_controller_1.default.getTeam);
router.post('/new/:companyName', team_controller_1.default.addTeam);
router.post('/user-to-team/:teamName', team_controller_1.default.addUserToTeam);
router.delete('/drop/:teamName/:companyName', team_controller_1.default.deleteTeam);
router.delete('/dropUser/:teamName/:companyName/:id', team_controller_1.default.deleteUserTeam);
//Exportamos router para usar rutas en app.ts
exports.default = router;
