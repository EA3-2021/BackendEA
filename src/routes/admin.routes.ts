import {Router} from "express"; 
import adminController from '../controllers/admin.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.post('/register-admin', adminController.registerAdmin);
router.post('/configuration', adminController.updateConfiguation );
router.get('/getLocations', adminController.getLocations);
router.get('/getAdminName', adminController.getAdminName);
router.get('/getPasswordAdmin/:email', adminController.getPasswordAdmin);
router.post('/newtask', adminController.newTask);
router.get('/taskall/:fecha/:company', adminController.getTask);
router.delete('/droptask/:id',adminController.deleteTask);
router.put('/updatetask/:id',adminController.updateTask);
router.get('/profile/:companyName', adminController.getAdmin);
router.post('/generate/code/:companyName', adminController.generateCode);
router.get('/getCode/:companyName/:date', adminController.getCode);
router.put('/updateAdminProfile/:companyName',adminController.updateAdminProfile);
router.post('/new',adminController.newUser);
router.get('/getHolidayPending/:company', adminController.getHolidayPending);
router.delete('/dropRequestHoliday/:id',adminController.refuseHoliday);
router.put('/acceptHoliday/:id',adminController.acceptHoliday);


// Exportamos router para usar rutas en app.ts
export default router;