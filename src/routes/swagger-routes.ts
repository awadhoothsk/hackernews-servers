// routes/swagger-routes.ts

import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";
import { openapi } from "./middelwares/openapi"; 

export const swaggerRoutes = new Hono();

swaggerRoutes.get("/", swaggerUI({ url: "/ui/swagger.json" }));

swaggerRoutes.get("/swagger.json", (c) => c.json(openapi));