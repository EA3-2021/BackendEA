import {Router} from "express"; 
import chatController from '../controllers/chat.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', chatController.getChats);
router.get('/:name', chatController.getChat);
router.post('/new',chatController.newChat);
//router.delete('/drop/:id',chatController.deleteChat);

//Exportamos router para usar rutas en app.ts
export default router;