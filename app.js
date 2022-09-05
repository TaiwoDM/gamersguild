import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

import articleRouter from './routes/articles.js';
import usersRouter from './routes/users.js';

const app = express();

// parse body
app.use(express.json());

app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', usersRouter);

export default app;
