import connectToMongodb from "./src/v1/services/mongodb.js";
import connectTONodemailer from "./src/v1/services/nodemailer.js";
import winston from "./src/v1/configs/winston.js";
import cookieParser from "cookie-parser";
import express, { json } from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 4001;

connectToMongodb();

connectTONodemailer();
app.use(cookieParser());
import morgan from "morgan";
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(json());
app.use(morgan("combined", { stream: winston.stream }));
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  res.status(err.status || 500);
});

import accountsRoutes from "./src/v1/routes/accounts.js";
import twitterRoutes from "./src/v1/routes/twitter.js";

app.use("/api/v1/accounts", accountsRoutes);
app.use("/api/v1/twitter", twitterRoutes);

app.listen(port, () => {
  console.log(`Viralytics is listening on port ${port}`);
});
