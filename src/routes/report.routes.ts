import {Router} from "express"; 
import reportController from '../controllers/report.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', reportController.getReports);
router.get('/:id', reportController.getReport);
router.post('/new', reportController.newReport);
router.delete('/dropall', reportController.deleteReports);
router.delete('/drop/:affair', reportController.deleteReport);
router.put('/update/:id', reportController.updateReport);
router.get('/hola', reportController.getHola);

//Exportamos router para usar rutas en app.ts
export default router;