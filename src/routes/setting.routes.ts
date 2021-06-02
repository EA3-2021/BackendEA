import {Router} from "express"; 
import settingController from '../controllers/setting.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', settingController.getSettingsUsers);
router.get('/:id', settingController.getSettingsUser);
router.post('/new', settingController.newSettingsUser);
router.put('/update/:id', settingController.updateSettingsUser);


//Exportamos router para usar rutas en app.ts
export default router;