import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Conexao from "../database/conexao.js";

import indexRoute from "../routes/index.js";
import docRoute from "../routes/doc.js";
import articleRoute from "../routes/article.js";

Conexao.catch((err) => {
  if (err) return console.error(err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log(`we're connected!`);
});

const app = express();

export default () => {
  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.resolve("src/public")));

  app.use(indexRoute);
  app.use("/doc", docRoute);
  app.use("/articles", articleRoute);

  return app;
};
