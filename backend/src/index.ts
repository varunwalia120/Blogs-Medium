import { Hono } from "hono";
import { cors } from "hono/cors";

import userRouter from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono();

// ✅ CORS middleware (production ready)
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",                 // local dev
      "https://blogs-medium-eight.vercel.app", // deployed frontend
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
