import {
  validateNewUser,
  validatePassword,
  validateUsername,
} from "../middleware/validators.js";
import { prisma } from "../lib/prisma.js";
import { matchedData } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

process.loadEnvFile();

export const postLogin = [
  ...validateUsername,
  ...validatePassword,
  async (req, res) => {
    try {
      const { username, password } = matchedData(req);
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) res.status(401).json({ error: "Invalid email or password" });

      const matches = await bcrypt.compare(password, user.password);

      if (!matches)
        res.status(401).json({ error: "Invalid email or password" });

      const token = jwt.sign({ id: user.id }, process.env.SERVER_SECRET, {
        expiresIn: "1d",
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

export const postRegister = [
  ...validateNewUser,
  ...validatePassword,
  async (req, res) => {
    try {
      const { username, password } = matchedData(req);
      console.log(username);

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });

      if (!newUser) res.status(500).json({ error: "Internal server error" });

      const token = jwt.sign({ id: newUser.id }, process.env.SERVER_SECRET, {
        expiresIn: "1d",
      });

      res.json({ message: "Registration successful", token });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];
