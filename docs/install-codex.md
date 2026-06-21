# Install In Codex

## Local Path

Use a local plugin path such as:

```text
~/plugins/serenity-agent
```

Use a personal marketplace path such as:

```text
~/.agents/plugins/marketplace.json
```

## Install Or Refresh

Use the personal marketplace entry:

```bash
codex plugin add serenity-agent@personal
```

Start a new Codex thread after reinstalling so the host picks up new skills and MCP tools.

## Entry Prompt

```text
Open Serenity Agent direct mode.
```

## Validation

```bash
npm install
npm run check
python /path/to/plugin-creator/scripts/validate_plugin.py /path/to/serenity-agent
```
