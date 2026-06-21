# Serenity Agent Kit

Serenity Agent Kit packages a distilled agent as a fixed, direct-dialogue product surface for Codex and Claude Code compatible hosts.

It is designed for this workflow:

1. Open Serenity Agent from a plugin, skill, command, or subagent entry.
2. Talk to it directly as the dedicated agent.
3. Keep the implementation immutable during normal use.
4. Enter maintenance mode only when explicitly changing the package.

## What Is Included

- Codex Plugin manifest in `.codex-plugin/plugin.json`
- Codex skill and agent card in `skills/serenity-agent/`
- Shared behavior source in `agent/`
- MCP bridge in `mcp-server/`
- Claude Code compatible skill, command, and subagent templates in `claude-code/.claude/`
- Validation scripts in `scripts/`

## Codex Usage

This local checkout is already structured as a Codex Plugin.

For local Codex installs, use a personal marketplace entry such as:

```text
~/.agents/plugins/marketplace.json
```

After installing the plugin in Codex, start with:

```text
Open Serenity Agent direct mode.
```

The Codex entrypoint is:

```text
skills/serenity-agent/SKILL.md
```

## Claude Code / Cloud Code Usage

Copy or sync these folders into a Claude Code project root:

```text
agent/
claude-code/.claude/
.mcp.json
mcp-server/
```

Then use one of the provided entries:

```text
/serenity
```

or invoke the `serenity-agent` skill/subagent from the host UI.

## MCP Tools

The MCP server exposes:

- `serenity_agent_profile`
- `serenity_agent_entrypoint`
- `serenity_agent_maintenance_check`

Install dependencies and run a smoke check:

```bash
npm install
npm run check
```

## Maintenance Boundary

Normal direct dialogue must not edit this package. Maintenance mode is allowed only when the user explicitly asks to change this agent, its prompt, plugin, adapters, MCP bridge, docs, or release state.

See `agent/maintenance-protocol.md` for the maintenance workflow.

## References

- Claude Code skills: https://code.claude.com/docs/en/skills
- Claude Code subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code MCP: https://code.claude.com/docs/en/mcp
