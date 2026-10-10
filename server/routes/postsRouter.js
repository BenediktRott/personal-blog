import { Router } from "express";
import * as postsController from "../controllers/postsController.js";
import { commentsRouter } from "./commentsRouter.js";

export const postsRouter = new Router();

postsRouter.use("/:id/comments", commentsRouter);

postsRouter.get("/", postsController.getPosts);
postsRouter.get("/:id", postsController.getPostsId);

postsRouter.post("/", postsController.postPosts);
postsRouter.delete("/:id", postsController.deletePostsId);
