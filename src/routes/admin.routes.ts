import {Router} from "express"; 
import adminController from '../controllers/admin.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.post('/register-admin', adminController.registerAdmin);
router.post('/configuration', adminController.updateConfiguation );
router.get('/getLocations', adminController.getLocations);
router.get('/getAdminName', adminController.getAdminName);
router.get('/getPasswordAdmin/:email', adminController.getPasswordAdmin);


// Exportamos router para usar rutas en app.ts
export default router;