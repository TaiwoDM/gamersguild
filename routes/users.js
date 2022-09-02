import expresss from 'express';

import { getMe } from '../controllers/users.js';
import { signup, secure } from '../controllers/authentication.js';

const router = expresss.Router();

router.post('/signup', signup);

router.get('/me', secure, getMe);

export default router;
