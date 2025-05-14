import "dotenv/config";
import { serve } from "@hono/node-server";
import { allRoutes } from "./routes/routes.js";
import { Hono } from "hono";

const app = new Hono();

app.route("/", allRoutes);

// ✅ Use 0.0.0.0 for Azure compatibility
const port = parseInt(process.env.PORT || "3000", 10);
serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0"
});

console.log(`Server is running at http://0.0.0.0:${port}`);
