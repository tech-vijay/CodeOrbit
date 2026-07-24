import { Router } from 'express';
import { createFormSubmission, getFormSubmissions } from '../controllers/formController.js';

const router = Router();

router.post('/submissions', createFormSubmission);
router.get('/submissions', getFormSubmissions);

export default router;
