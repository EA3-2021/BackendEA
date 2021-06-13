import {Router} from "express"; 
import teamController from '../controllers/team.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all/:companyName', teamController.getTeams);
router.get('/:id', teamController.getTeam);
router.post('/new/:companyName', teamController.addTeam);
router.post('/user-to-team/:teamName', teamController.addUserToTeam);
router.delete('/drop/:teamName/:companyName',teamController.deleteTeam);
router.delete('/dropUser/:teamName/:companyName/:id',teamController.deleteUserTeam);



//Exportamos router para usar rutas en app.ts
export default router;