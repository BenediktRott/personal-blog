import { Router } from "express";
import * as commentsController from "../controllers/commentsController.js";

export const commentsRouter = new Router({ mergeParams: true });

// /posts/:id/comments

commentsRouter.get("/", commentsController.getComments);
commentsRouter.post("/", commentsController.postComments);
commentsRouter.delete("/:commentId", commentsController.deleteComment);
