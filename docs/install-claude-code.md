# Install In Claude Code / Cloud Code

This package includes Claude Code compatible project files under:

```text
claude-code/.claude/
```

## Project Install

Copy these paths into the target project root:

```text
agent/
claude-code/.claude/
.mcp.json
mcp-server/
package.json
package-lock.json
```

If you do not use the root `package.json`, install the MCP server dependencies from `mcp-server/`.

## Entries

Use the skill:

```text
serenity-agent
```

Use the slash command:

```text
/serenity
```

Use the subagent when the host should isolate the task:

```text
serenity-agent
```

## MCP

The root `.mcp.json` registers the Serenity Agent MCP server with a local Node command.

Run:

```bash
npm install
npm run mcp:smoke
```

If your host resolves MCP command paths from a different working directory, replace the relative path in `.mcp.json` with an absolute path to `mcp-server/src/index.js`.
