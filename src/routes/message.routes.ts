import {Router} from "express"; 
import messageController from '../controllers/message.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', messageController.getMessages);
router.get('/:name', messageController.getMessage);
router.post('/new', messageController.newMessage);
//router.delete('/drop/:id',messageController.deleteMessage);

//Exportamos router para usar rutas en app.ts
export default router;