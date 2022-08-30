import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

import articleRoutes from './routes/articles.js';
import usersRoutes from './routes/users.js';

const app = express();

// parse body
app.use(express.json());

app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/users', usersRoutes);

export default app;
