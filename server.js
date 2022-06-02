import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
  path: `${__dirname}/config.env`,
});

import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
