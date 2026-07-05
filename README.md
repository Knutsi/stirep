# sitflow

A small [Deno](https://deno.com) + [Hono](https://hono.dev) API with
auto-generated OpenAPI docs served by [Scalar](https://scalar.com).

## Requirements

- [Deno](https://deno.com) >= 2.x

## Getting started

```sh
deno task dev      # run with watch mode (http://localhost:8000)
deno task start    # run without watch
deno task check    # typecheck the project (deno check)
deno task test     # run tests
```

## Endpoints

| Method | Path            | Description            |
| ------ | --------------- | ---------------------- |
| GET    | `/`             | Greet the world.       |
| GET    | `/hello/{name}` | Greet someone by name. |
| GET    | `/openapi.json` | OpenAPI 3 spec.        |
| GET    | `/docs`         | Scalar API docs UI.    |

## Typechecking

Typechecking uses Deno's built-in TypeScript compiler via `deno check .` (see
the `check` task). This is the recommended approach for Deno projects — no
separate `tsc` or external tooling required.

## API docs

OpenAPI documentation is generated automatically from the route definitions and
Zod schemas in [`app.ts`](./app.ts). Browse the interactive Scalar UI at
`/docs`, or fetch the raw spec at `/openapi.json`.

## Project layout

```
app.ts        # API routes, OpenAPI spec, Scalar docs, server entrypoint
deno.json     # Tasks, dependencies, compiler & lint config
CLAUDE.md     # Agent instructions
```
