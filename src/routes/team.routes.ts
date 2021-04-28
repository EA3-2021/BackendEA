import {Router} from "express"; 
import teamController from '../controllers/team.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', teamController.getTeams);
router.get('/:id', teamController.getTeam);
router.post('/new', teamController.addTeam);
router.post('/newUser/:teamName', teamController.addUserToTeam);

//Exportamos router para usar rutas en app.ts
export default router;