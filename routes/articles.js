import expresss from 'express';

import { createArticle, getAllArticles } from '../controllers/articles.js';

const router = expresss.Router();

router.get('/', getAllArticles);
router.post('/', createArticle);

export default router;
