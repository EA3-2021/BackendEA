import {Router} from "express"; 
import clockController from '../controllers/clock.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.get('/getClock/:clockIn', clockController.getClock);
router.post('/clockIn/:workerID/:code', clockController.clockIn);
router.put('/clockOut/:workerID', clockController.clockOut);


// Exportamos router para usar rutas en app.ts
export default router;