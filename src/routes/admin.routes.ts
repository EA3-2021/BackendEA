import {Router} from "express"; 
import adminController from '../controllers/admin.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.post('/register', adminController.register);
router.post('/license', adminController.newLicense);
router.get('/:licenseCode', adminController.checklicense);

// Exportamos router para usar rutas en app.ts
export default router;