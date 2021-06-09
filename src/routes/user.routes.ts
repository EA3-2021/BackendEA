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
router.post('/newtask', userController.newTask);
router.get('/taskall/:fecha', userController.getTask);
router.delete('/droptask/:titulo',userController.deleteTask);
router.post('/newlocation', userController.newLocation);

//Exportamos router para usar rutas en app.ts
export default router;