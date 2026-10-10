import { Visibility } from "../generated/prisma/index.js";
import { prisma } from "../lib/prisma.js";
import { authenticateToken, isAuthor } from "../middleware/auth.js";
import { validatePost } from "../middleware/validators.js";
import { matchedData } from "express-validator";

export const getPosts = [
  authenticateToken,
  async (req, res) => {
    console.log(req.user);
    const posts = await prisma.post.findMany({
      where: {
        OR: [{ visibility: Visibility.PUBLIC }, { authorId: req.user.id }],
      },
    });
    res.json(posts);
  },
];

export const getPostsId = [
  authenticateToken,
  async (req, res) => {
    if (!req.params.id) res.sendStatus(400);

    const postId = Number(req.params.id);

    const post = await prisma.post.findFirst({
      where: {
        AND: [
          { id: postId },
          {
            OR: [{ visibility: Visibility.PUBLIC }, { authorId: req.user.id }],
          },
        ],
      },
    });

    if (!post) res.sendStatus(400);

    res.json(post);
  },
];

export const postPosts = [
  authenticateToken,
  isAuthor,
  ...validatePost,
  async (req, res, next) => {
    try {
      const { title, text, visibility } = matchedData(req);
      const post = await prisma.post.create({
        data: { title: title, text: text, authorId: req.user.id, visibility },
      });

      res.json({ message: "Post create successfully" });
    } catch (error) {
      next(error);
    }
  },
];

export const deletePostsId = [
  authenticateToken,
  isAuthor,
  async (req, res, next) => {
    try {
      if (!req.params.id) res.sendStatus(400);

      const id = Number(req.params.id);
      const deleted = await prisma.post.deleteMany({
        where: { AND: [{ id: id }, { authorId: req.user.id }] },
      });

      if (!deleted)
        res.status(404).message(`Could not find/delete post with id ${id}`);

      res.json({
        message: `Post deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  },
];
