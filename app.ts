import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json({ message: "Hello, world!" }));

app.get("/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.json({ message: `Hello, ${name}!` });
});

Deno.serve({ port: 8000 }, app.fetch);
