import expresss from 'express';

import { createArticle, getAllArticles } from '../controllers/articles.js';
import { secure } from '../controllers/authentication.js';

const router = expresss.Router();

router.get('/', getAllArticles);
router.post('/', secure, createArticle);

export default router;
