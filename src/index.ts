import { Hono } from "hono";
import { cors } from "hono/cors";
import stock from "./routes/stock";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({ message: "Stock Portfolio API" });
});

app.route("/api/stock", stock);

export default {
  port: 3000,
  fetch: app.fetch,
};

console.log("Server has started");
