# CLAUDE.md

This file guides AI coding agents (opencode, Claude Code, etc.) working in this
repository.

## Project

**sitflow** is a small HTTP API built with Deno 2.x and
[Hono](https://hono.dev). Routes are plain Hono handlers — no OpenAPI wrapper,
no schema/validation library. Architecture will be expanded later.

## Stack

- Runtime: Deno >= 2.x (no Node, no npm CLI)
- Web framework: Hono (`npm:hono`)

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
- Add new routes in `app.ts` using plain `app.get`/`app.post`/etc. handlers.
- Server entrypoint is `app.ts` (declared as `exports` in `deno.json`).

## Typechecking

Best practice for Deno is `deno check` (the `check` task). It uses the
TypeScript compiler shipped with Deno — there is no need for a separate `tsc` or
external tool.
