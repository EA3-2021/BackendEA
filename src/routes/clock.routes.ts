import {Router} from "express"; 
import clockController from '../controllers/clock.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.get('/getClock/:clockIn/:company', clockController.getClock);
router.post('/clockIn/:workerID', clockController.clockIn);
router.put('/clockOut', clockController.clockOut);


// Exportamos router para usar rutas en app.ts
export default router;