import {Router} from "express"; 
import messageController from '../controllers/message.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', messageController.getMessages);
router.get('/:id', messageController.getMessage);
router.post('/new', messageController.newMessage);
router.delete('/dropall', messageController.deleteMessages);
router.delete('/drop/:description', messageController.deleteMessage);
router.put('/update/:id', messageController.updateMessage);


//Exportamos router para usar rutas en app.ts
export default router;