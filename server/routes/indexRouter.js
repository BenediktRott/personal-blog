import { Router } from "express";

export const indexRouter = new Router();

indexRouter.get("/", (req, res) => {
  res.send("Hello World");
});
