# Architecture

Serenity Agent Kit uses one shared behavioral core and multiple host adapters.

## Layers

- `agent/`: source of truth for behavior, profile, and maintenance rules.
- `skills/serenity-agent/`: Codex Plugin activation layer.
- `.codex-plugin/plugin.json`: Codex Plugin metadata and discoverability.
- `.mcp.json`: MCP server registration for hosts that read plugin MCP config.
- `mcp-server/`: host-neutral tools for profile and startup instructions.
- `claude-code/.claude/`: Claude Code compatible skill, command, and subagent files.

## Source Of Truth

The behavioral source of truth is:

```text
agent/core-instructions.md
```

Host adapters should reference this file instead of duplicating long behavior rules. When behavior changes, update the core first, then check each adapter still points at the core.

## Why This Is Not Only A Skill

A plain skill is easy to trigger but easy to blur with normal conversation. This package adds stronger boundaries:

- A Codex Plugin card and manifest for product-like installation.
- A Codex agent manifest for a direct entry surface.
- A protected maintenance protocol.
- A host-neutral MCP bridge.
- Claude Code compatible entry files.

This keeps daily use stable while still allowing explicit maintenance.
