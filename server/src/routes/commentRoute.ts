import { Router } from 'express';
import { createComment, getComments } from '../controllers/comment';


const router = Router()
router.post('/comments/:urlId', createComment)
router.get('/getComments', getComments)

export default router;