import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.json({
    message: "success",
  });
});

export default app;
