import {Router} from "express"; 
import commentController from '../controllers/comment.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all/:workerID', commentController.getComments);
//router.get('/:id', commentController.getComment);
router.post('/new',commentController.newComment);
//router.delete('/drop/:id',commentController.deleteComment);
router.delete('/drop/:id', commentController.deleteComment);
router.get('/all/admin/:companyName', commentController.getCommentsAdmin);
router.put('/resolve/:id',commentController.resolveComment);



//Exportamos router para usar rutas en app.ts
export default router;