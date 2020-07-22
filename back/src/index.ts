import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import Seed from "./utils/seed";

const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

Seed();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "./frontbuild")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontbuild", "./index.html"));
});

// Routes getter
Routes.forEach((route) => {
  (app as any)[route.method](
    route.route,
    (req: Request, res: Response, next: Function) => {
      const result = new (route.controller as any)()[route.action](
        req,
        res,
        next
      );
    }
  );
});

//TODO env port
app.listen(process.env.PORT || 3000);

console.log(
  `Express server has started on port ${app.get(
    "port"
  )}. Open http://localhost:${app.get("port")}/events to see results`
);

module.exports = app;
