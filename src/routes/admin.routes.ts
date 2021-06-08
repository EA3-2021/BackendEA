import {Router} from "express"; 
import adminController from '../controllers/admin.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.post('/register-admin', adminController.registerAdmin);
router.post('/license', adminController.newLicense);
router.get('/:licenseCode', adminController.checklicense);
<<<<<<< HEAD
=======
router.post('/configuration', adminController.updateConfiguation );
>>>>>>> 6c881eccf9b1c3e004e329a26612b0239fe4b345

// Exportamos router para usar rutas en app.ts
export default router;