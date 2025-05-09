import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";

import { authenticationRoutes } from "./authentication-routes.js";
import { usersRoutes } from "./user-routes.js";
import { postsRoutes } from "./post-routes.js";
import { likesRoutes } from "./like-routes.js";
import { commentsRoutes } from "./comments-routes.js";

import { cors } from "hono/cors";
import { authRoute } from "./middelwares/session-middleware";
import { webClientUrl } from "../environment.js";

export const allRoutes = new Hono();

allRoutes.use(
  cors({
    origin: [webClientUrl],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization", "token"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

allRoutes.get("/ui", swaggerUI({ url: "/docs" }));

allRoutes.route("/api/auth", authRoute);
allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likesRoutes);
allRoutes.route("/comments", commentsRoutes);