import expresss from 'express';

import { getMe } from '../controllers/users.js';
import { signup, secure, login } from '../controllers/authentication.js';

const router = expresss.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', secure, getMe);

export default router;
