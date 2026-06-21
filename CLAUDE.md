# Claude Code Notes

This repository contains Serenity Agent Kit.

When using this repo in Claude Code:

- Use `agent/core-instructions.md` as the behavioral source of truth.
- Use `claude-code/.claude/skills/serenity-agent/SKILL.md` for direct dialogue mode.
- Use `claude-code/.claude/commands/serenity.md` as the slash command shim.
- Use `claude-code/.claude/agents/serenity-agent.md` only when isolated subagent work is useful.
- Do not modify protected package files unless the user explicitly requests maintenance.
