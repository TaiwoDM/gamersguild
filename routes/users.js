import expresss from 'express';

import { getMe, getAllUsers, updateMe } from '../controllers/users.js';
import { signup, secure, login } from '../controllers/authentication.js';

const router = expresss.Router();

router.get('/', getAllUsers);

router.post('/signup', signup);
router.post('/login', login);

router.route('/me').get(secure, getMe).patch(secure, updateMe);

export default router;
