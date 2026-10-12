import { Visibility } from "../generated/prisma/index.js";
import { prisma } from "../lib/prisma.js";
import { authenticateToken, isAuthor } from "../middleware/auth.js";
import { validateComment } from "../middleware/validators.js";
import { matchedData } from "express-validator";

export const getComments = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user.id;

    if (!req.params.id)
      res.status(400).json({ message: "No post id provided" });

    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(req.params.id),
        post: {
          OR: [
            { visibility: Visibility.PUBLIC },
            ...(userId ? [{ authorId: userId }] : []),
          ],
        },
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    res.json(comments);
  },
];

export const postComments = [
  authenticateToken,
  isAuthor,
  ...validateComment,
  async (req, res, next) => {
    try {
      const { text } = matchedData(req);
      const comment = await prisma.comment.create({
        data: {
          text: text,
          authorId: req.user.id,
          postId: Number(req.params.id),
        },
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      });

      res.json(comment);
    } catch (error) {
      next(error);
    }
  },
];

export const deleteComment = [
  authenticateToken,
  isAuthor,
  async (req, res, next) => {
    try {
      if (!req.params.commentId) res.sendStatus(400);

      const commentId = Number(req.params.commentId);
      const deleted = await prisma.comment.deleteMany({
        where: { AND: [{ id: commentId }, { authorId: req.user.id }] },
      });

      if (!deleted)
        res.status(404).message(`Could not find/delete Comment with id ${id}`);

      res.json({
        message: `Comment deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  },
];
