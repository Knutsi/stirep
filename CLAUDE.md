# CLAUDE.md

This file guides AI coding agents (opencode, Claude Code, etc.) working in this
repository.

## Project

**sitflow** is a small HTTP API built with Deno 2.x and
[Hono](https://hono.dev). Routes are defined with `@hono/zod-openapi` so they
carry Zod schemas that double as the OpenAPI spec. The Scalar docs UI is served
at `/docs`.

## Stack

- Runtime: Deno >= 2.x (no Node, no npm CLI)
- Web framework: Hono (`npm:hono`) via `@hono/zod-openapi`
- Validation / schema: Zod (`npm:zod`)
- Docs UI: Scalar (`@hono/scalar`)

Dependencies are declared in `deno.json` under `imports` and resolved through
Deno's npm specifier support. Do **not** add a `package.json` or `node_modules`.

## Commands

```sh
deno task dev      # run with --watch on :8000
deno task start    # run on :8000
deno task check    # typecheck everything: `deno check .`
deno task test     # run tests: `deno test`
```

Always run `deno task check` after non-trivial changes. Prefer `deno fmt` and
`deno lint` before finishing a change.

## Conventions

- TypeScript, strict mode (see `compilerOptions` in `deno.json`).
- No comments unless explicitly requested.
- Add new routes in `app.ts` using `app.openapi(...)` with Zod schemas for
  params/body/responses, so they appear in `/openapi.json` and `/docs`
  automatically.
- Keep the OpenAPI `app.doc(...)` info block in sync with project version.
- Server entrypoint is `app.ts` (declared as `exports` in `deno.json`).

## Typechecking

Best practice for Deno is `deno check` (the `check` task). It uses the
TypeScript compiler shipped with Deno — there is no need for a separate `tsc` or
`vue-tsc`-style tool.

## Docs

Scalar serves an OpenAPI 3 browser at `/docs`; the raw spec is at
`/openapi.json`. When adding endpoints, ensure response/request schemas are Zod
objects so the spec stays complete.
