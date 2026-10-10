import { body, validationResult } from "express-validator";
import { prisma } from "../lib/prisma.js";
import { Visibility } from "../generated/prisma/index.js";

const validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(), // Returns a clean array of error details
    });
  }

  next();
};

export const validateUsername = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be 3–30 characters long")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers")
    .escape(),
  validation,
];

export const validateNewUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be 3–30 characters long")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers")
    .escape()
    .custom(async (username) => {
      const existingUser = await prisma.user.findUnique({
        where: { username: username },
      });
      if (existingUser) {
        throw new Error("User already exists");
      }
      return true;
    }),
  validation,
];

export const validatePassword = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("Password has to be between 4 and 50 characters long"),
  validation,
];

const validateTitle = body("title")
  .trim()
  .notEmpty()
  .withMessage("Title is required");

const validateText = [
  body("text").trim().notEmpty().withMessage("Post can not be empty"),
];

const validateVisibility = [
  body("visibility")
    .optional()
    .isIn(Object.values(Visibility))
    .withMessage(
      `Visibility must be one of ${Object.values(Visibility).join(" or ")}`,
    ),
];

export const validatePost = [
  validateTitle,
  validateText,
  validateVisibility,
  validation,
];

export const validateComment = [validateText, validation];
