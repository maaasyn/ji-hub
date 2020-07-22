"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventController_1 = require("./controller/EventController");
exports.Routes = [
    {
        method: "get",
        route: "/events",
        controller: EventController_1.EventController,
        action: "all",
    },
    {
        method: "get",
        route: "/events/:id",
        controller: EventController_1.EventController,
        action: "one",
    },
    {
        method: "post",
        route: "/events",
        controller: EventController_1.EventController,
        action: "save",
    },
    {
        method: "put",
        route: "/events/:id",
        controller: EventController_1.EventController,
        action: "update",
    },
    {
        method: "delete",
        route: "/events/:id",
        controller: EventController_1.EventController,
        action: "remove",
    },
];
//# sourceMappingURL=routes.js.map