import {Router} from "express"; 
import userController from '../controllers/user.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.post('/registerUser', userController.registerUser);
router.get('/profile/:workerID', userController.getUser);
router.delete('/drop/:name',userController.deleteUser);
router.put('/update/:id',userController.updateUser);
//router.post('/newtask', userController.newTask);
router.get('/taskall/:workerID/:fecha', userController.getTasks);
//router.delete('/droptask/:titulo',userController.deleteTask);
router.post('/newlocation', userController.newLocation);
router.get('/register/Requests', userController.registerRequests);
router.delete('/drop/registerRequest/:workerID/:email',userController.deleteRegisterRequest);
router.put('/accept/:workerID/:email',userController.acceptRegisterRequest);
router.get('/getPasswordUser/:email', userController.getPasswordUser);
router.post('/holidayRequest', userController.holidayRequest);
router.get('/holidayall/:workerID/:fecha', userController.getHolidays);
router.put('/updateProfile/:workerID',userController.updateProfile);
router.post('/newConfiguration', userController.createConfiguration );
router.put('/updateConfiguration/:workerID', userController.updateConfiguration );
router.get('/locationConfiguration/:workerID', userController.checkLocationConfig);
router.get('/all/:workerID', userController.getUsers);
router.get('/currentConfig/:workerID', userController.getConfigurations);

//router.post('/clockIn', userController.clockIn);
//router.post('/clockOut', userController.clockOut);

//Exportamos router para usar rutas en app.ts
export default router;