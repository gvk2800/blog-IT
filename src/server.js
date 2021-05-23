import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env") });
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import connectDB from "./db/dbConfig";
import passport from "passport";
import { passport as passportMiddleware } from "./middlewares/passport";

const app = express();

function setupServer() {
  connectDB();
  middlewares();
  app.use("/api/posts", postRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

function middlewares() {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Passport middleware
  app.use(passport.initialize());
  passportMiddleware;
}

function startServer(port) {
  app.listen(port);
  console.log(`server started on port ${port}`);
}

setupServer();
startServer(process.env.PORT || 5000);
