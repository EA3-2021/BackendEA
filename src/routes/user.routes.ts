import {Router} from "express"; 
import userController from '../controllers/user.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.post('/registerUser', userController.registerUser);
router.get('/all/:company', userController.getUsers);
//router.get('/:id', userController.getUser);
router.post('/new',userController.newUser);
router.delete('/drop/:name',userController.deleteUser);
router.put('/update/:id',userController.updateUser);
router.post('/newtask', userController.newTask);
router.get('/taskall/:fecha', userController.getTask);
router.delete('/droptask/:titulo',userController.deleteTask);
router.post('/newlocation', userController.newLocation);
router.get('/register/Requests', userController.registerRequests);
router.delete('/drop/registerRequest/:workerID/:email',userController.deleteRegisterRequest);
router.put('/accept/:workerID/:email',userController.acceptRegisterRequest);
router.get('/getPasswordUser/:email', userController.getPasswordUser);
router.post('/holidayRequest/:workerID', userController.holidayRequest);
router.get('/getWorkerID/:company', userController.getWorkerID);
//router.post('/clockIn', userController.clockIn);
//router.post('/clockOut', userController.clockOut);


//Exportamos router para usar rutas en app.ts
export default router;