import expresss from 'express';

import { createUser } from '../controllers/users.js';

const router = expresss.Router();

// router.get('/', getAllArticles);
router.post('/', createUser);

export default router;
