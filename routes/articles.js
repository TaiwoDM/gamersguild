import expresss from 'express';

import {
  createArticle,
  getAllArticles,
  getArticle,
  publishArticle,
} from '../controllers/articles.js';
import { secure } from '../controllers/authentication.js';

const router = expresss.Router();

router.route('/').get(getAllArticles).post(secure, createArticle);

router.route('/:id').get(getArticle);

router.route('/:id/publish').patch(secure, publishArticle);

export default router;
