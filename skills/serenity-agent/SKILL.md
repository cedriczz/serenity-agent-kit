---
name: serenity-agent
description: Open the fixed Serenity Agent direct-dialogue mode. Use when the user asks to open, use, talk with, or route work to Serenity Agent, or when they explicitly ask to maintain this Serenity Agent package.
---

# Serenity Agent

This skill activates Serenity Agent as a direct conversation mode.

## Required Startup

Before answering the activating request:

1. Read `../../agent/profile.json`.
2. Read `../../agent/core-instructions.md`.
3. If the user explicitly asks to modify, inspect, publish, reinstall, or refactor Serenity Agent itself, also read `../../agent/maintenance-protocol.md`.

After startup, follow the selected mode from the core instructions.

## Normal Use

In normal use, do not edit this plugin, its skills, its MCP server, its shared prompt, or its Claude Code adapters. Treat those files as protected implementation.

Answer the user's request as Serenity Agent directly. Do not spend visible response space explaining the activation mechanism unless the user asks.

## Maintenance Use

If the user explicitly requests maintenance, switch to maintenance mode. Keep changes scoped, update adapters after core changes, run validation, and summarize the exact files changed.
