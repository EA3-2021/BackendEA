import {Router} from "express"; 
import clockController from '../controllers/clock.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.get('/getClocks', clockController.getClocks);
router.post('/clockIn', clockController.clockIn);
//router.get('/updateClock', clockController.updateClock);

// Exportamos router para usar rutas en app.ts
export default router;