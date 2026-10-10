import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { Role } from "../generated/prisma/index.js";
process.loadEnvFile();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SERVER_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

export const isAuthor = async (req, res, next) => {
  if (!req.user) return res.sendStatus(401);

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user) return res.sendStatus(400);

  if (user.role === Role.AUTHOR || user.role === Role.ADMIN) {
    next();
  } else {
    res.sendStatus(401);
  }
};
