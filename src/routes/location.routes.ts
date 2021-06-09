import {Router} from "express"; 
import locationController from '../controllers/location.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.get('/getLocations', locationController.getLocations);

// Exportamos router para usar rutas en app.ts
export default router;