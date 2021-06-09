import {Router} from "express"; 
import userController from '../controllers/user.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/new',userController.newUser);
router.delete('/dropall',userController.deleteUsers);
router.delete('/drop/:name',userController.deleteUser);
router.put('/update/:id',userController.updateUser);
router.post('/task/new', userController.newTask);

//Exportamos router para usar rutas en app.ts
export default router;