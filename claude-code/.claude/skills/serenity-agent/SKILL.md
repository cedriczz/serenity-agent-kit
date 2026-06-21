---
name: serenity-agent
description: Open Serenity Agent direct-dialogue mode from Claude Code compatible hosts.
---

# Serenity Agent

Activate Serenity Agent for the current conversation.

## Startup

Read and follow these files from the project root:

1. `agent/profile.json`
2. `agent/core-instructions.md`
3. `agent/maintenance-protocol.md` only when the user explicitly requests maintenance

If these files are missing, tell the user the full Serenity Agent package is not installed in the project.

## Behavior

Use direct dialogue mode by default. Do not modify Serenity Agent source files unless the user explicitly asks for maintenance.

User request:

```text
$ARGUMENTS
```
