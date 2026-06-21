# Repository Agent Rules

- Treat UTF-8 as required for generated and edited text files.
- Keep `agent/core-instructions.md` as the behavioral source of truth.
- Do not edit protected Serenity Agent implementation files during normal use.
- Enter maintenance mode only when the user explicitly asks to change this package.
- After changing behavior, check Codex and Claude Code adapters still point to the shared core.
- Run `npm run check` and Codex plugin validation before publishing.
