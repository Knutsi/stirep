import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { z } from "zod";

const app = new OpenAPIHono();

const MessageSchema = z.object({
  message: z.string().openapi({ example: "Hello, world!" }),
});

app.openapi(
  {
    method: "get",
    path: "/",
    summary: "Greet the world",
    responses: {
      200: {
        description: "A friendly greeting",
        content: { "application/json": { schema: MessageSchema } },
      },
    },
  },
  (c) => c.json({ message: "Hello, world!" }),
);

app.openapi(
  {
    method: "get",
    path: "/hello/{name}",
    summary: "Greet someone by name",
    request: {
      params: z.object({
        name: z.string().min(1).openapi({ example: "Knut" }),
      }),
    },
    responses: {
      200: {
        description: "A personalized greeting",
        content: { "application/json": { schema: MessageSchema } },
      },
    },
  },
  (c) => {
    const { name } = c.req.valid("param");
    return c.json({ message: `Hello, ${name}!` });
  },
);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "sitflow API",
    version: "0.1.0",
    description: "A small Deno + Hono API with Scalar OpenAPI docs.",
  },
});

app.get(
  "/docs",
  apiReference({ url: "/openapi.json", theme: "purple", layout: "modern" }),
);

Deno.serve({ port: 8000 }, app.fetch);
