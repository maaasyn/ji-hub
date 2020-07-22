"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./routes");
var seed_1 = require("./utils/seed");
var path = require("path");
var app = express();
app.set("port", process.env.PORT || 3000);
seed_1.default();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./frontbuild")));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontbuild", "./index.html"));
});
// Routes getter
routes_1.Routes.forEach(function (route) {
    app[route.method](route.route, function (req, res, next) {
        var result = new route.controller()[route.action](req, res, next);
    });
});
//TODO env port
app.listen(process.env.PORT || 3000);
console.log("Express server has started on port " + app.get("port") + ". Open http://localhost:" + app.get("port") + "/events to see results");
module.exports = app;
//# sourceMappingURL=index.js.map