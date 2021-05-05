import express, { Response as ExResponse, Request as ExRequest } from "express";

import cors from "cors";

import mongoose from "mongoose";

import http from "http";

import dotenv from "dotenv";
dotenv.config();

import swaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "../build/routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Connect to MongoDB.
 */
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.connection.on("error", (err: any) => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running."
  );
  process.exit();
});

app.use(cors());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running port ${port}`);
});
