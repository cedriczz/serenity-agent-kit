# Serenity Agent Maintenance Protocol

Use this protocol only when the user explicitly asks to inspect or change the Serenity Agent package.

## Maintenance Scope

Before editing, identify which layer is in scope:

- `core`: `agent/core-instructions.md` and `agent/profile.json`
- `codex`: `.codex-plugin/plugin.json`, `.mcp.json`, and `skills/`
- `claude-code`: `claude-code/.claude/`
- `mcp`: `mcp-server/`
- `docs`: `README.md` and `docs/`
- `release`: version, git, GitHub, and installation notes

If the requested change spans multiple layers, update the shared core first and then sync adapters.

## Edit Rules

- Preserve UTF-8 text.
- Keep the shared core as the behavioral source of truth.
- Do not duplicate long behavior rules into adapters unless the host requires it.
- Keep protected source changes narrow and reviewable.
- Run plugin validation and repository checks after edits.
- If behavior changes, update the version or document why it remains unchanged.

## Verification

Run these checks when available:

```bash
npm install
npm run validate
python /path/to/plugin-creator/scripts/validate_plugin.py /path/to/serenity-agent
```

For Codex updates, reinstall or refresh the plugin from the personal marketplace, then test in a new thread. For Claude Code updates, restart the host or reload project skills if the host caches them.
