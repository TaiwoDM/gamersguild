import expresss from 'express';

import { createUser } from '../controllers/users.js';
import { signup } from '../controllers/authentication.js';

const router = expresss.Router();

router.post('/signup', signup);

// router.get('/', getAllArticles);
router.post('/', createUser);

export default router;
