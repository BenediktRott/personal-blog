import path from "node:path";
import express, { urlencoded } from "express";
import { fileURLToPath } from "node:url";
import { prisma } from "./lib/prisma.js";
import { indexRouter } from "./routes/indexRouter.js";
import { postsRouter } from "./routes/postsRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { authRouter } from "./routes/authRouter.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.json());

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
