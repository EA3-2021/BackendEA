import {Router} from "express"; 
import licenseController from '../controllers/license.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.post('/obtain', licenseController.getLicense);
router.post('/use', licenseController.useLicense);

// Exportamos router para usar rutas en app.ts
export default router;