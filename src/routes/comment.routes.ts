import {Router} from "express"; 
import commentController from '../controllers/comment.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', commentController.getComments);
//router.get('/:id', commentController.getComment);
router.post('/new',commentController.newComment);
//router.delete('/drop/:id',commentController.deleteComment);

//Exportamos router para usar rutas en app.ts
export default router;