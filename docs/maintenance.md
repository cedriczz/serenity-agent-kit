# Maintenance

Maintenance mode exists so the agent can be improved without allowing normal conversations to mutate its implementation.

## When Maintenance Is Allowed

Maintenance is allowed only when the user explicitly asks to change this package. Examples:

- Update the prompt.
- Change Codex Plugin metadata.
- Add or adjust Claude Code support.
- Modify the MCP tools.
- Publish a new version.

## Standard Flow

1. Read `agent/profile.json`.
2. Read `agent/core-instructions.md`.
3. Read `agent/maintenance-protocol.md`.
4. Identify the affected layer.
5. Edit only the needed files.
6. Run validation.
7. Commit and publish if requested.

## Validation Commands

```bash
npm install
npm run check
python /path/to/plugin-creator/scripts/validate_plugin.py /path/to/serenity-agent
```
