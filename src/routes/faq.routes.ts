import {Router} from "express"; 
import faqController from '../controllers/faq.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

router.get('/all', faqController.getFaqs);
router.get('/:id', faqController.getFaq);
router.post('/new',faqController.newFaq);
router.delete('/drop/:title',faqController.deleteFaq);
router.put('/update/:id',faqController.updateFaq);

//Exportamos router para usar rutas en app.ts
export default router;