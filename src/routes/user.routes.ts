import {Router} from "express"; 
import UserController from '../controllers/user.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/new',UserController.newUser);
router.delete('/dropall',UserController.deleteUsers);
router.delete('/drop/:name',UserController.deleteUser);
router.put('/update/:id',UserController.updateUser);

//Exportamos router para usar rutas en app.ts
export default router;