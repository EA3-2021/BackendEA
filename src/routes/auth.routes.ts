import {Router} from "express"; 
import authController from '../controllers/auth.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.post('/login-admin', authController.loginAdmin);
router.post('/loginUser', authController.loginUser);
//router.put('/signout', authController.signout);

// Exportamos router para usar rutas en app.ts
export default router;