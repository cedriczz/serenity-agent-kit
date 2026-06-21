#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const currentFile = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(currentFile), "..", "..");

const toolDefinitions = [
  {
    name: "serenity_agent_profile",
    description: "Return the Serenity Agent profile, core instructions, and maintenance boundary.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false
    }
  },
  {
    name: "serenity_agent_entrypoint",
    description: "Return startup instructions for a host integration.",
    inputSchema: {
      type: "object",
      properties: {
        host: {
          type: "string",
          enum: ["codex", "claude-code", "cloud-code", "generic"],
          description: "The host requesting startup instructions."
        }
      },
      additionalProperties: false
    }
  },
  {
    name: "serenity_agent_maintenance_check",
    description: "Classify whether a user request is normal use or explicit Serenity Agent maintenance.",
    inputSchema: {
      type: "object",
      properties: {
        request: {
          type: "string",
          description: "The user request to classify."
        }
      },
      required: ["request"],
      additionalProperties: false
    }
  }
];

async function readUtf8(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

async function loadProfileBundle() {
  const [profileText, coreInstructions, maintenanceProtocol] = await Promise.all([
    readUtf8("agent/profile.json"),
    readUtf8("agent/core-instructions.md"),
    readUtf8("agent/maintenance-protocol.md")
  ]);

  return {
    profile: JSON.parse(profileText),
    coreInstructions,
    maintenanceProtocol
  };
}

function classifyMaintenance(request) {
  const text = request.toLowerCase();
  const maintenanceTerms = [
    "maintain",
    "maintenance",
    "modify this agent",
    "change this agent",
    "update this agent",
    "edit the plugin",
    "edit this plugin",
    "plugin manifest",
    "core-instructions",
    "maintenance-protocol",
    "publish a new version",
    "reinstall the plugin",
    "修改这个 agent",
    "更新这个 agent",
    "维护模式",
    "改这个插件",
    "改 prompt",
    "修改 prompt",
    "发布新版本"
  ];

  const isMaintenance = maintenanceTerms.some((term) => text.includes(term));

  return {
    mode: isMaintenance ? "maintenance" : "direct-dialogue",
    maintenanceRequired: isMaintenance,
    reason: isMaintenance
      ? "The request explicitly targets Serenity Agent source, behavior, prompt, plugin, or release work."
      : "The request does not explicitly ask to maintain the Serenity Agent package."
  };
}

function entrypointForHost(host) {
  const normalizedHost = host || "generic";
  const codex = [
    "Read `agent/profile.json` and `agent/core-instructions.md`.",
    "Use `skills/serenity-agent/SKILL.md` as the Codex activation contract.",
    "Use maintenance mode only for explicit package changes."
  ];
  const claude = [
    "Install or copy `agent/` and `claude-code/.claude/` into the target project.",
    "Invoke the `serenity-agent` skill or `/serenity` command.",
    "Use maintenance mode only for explicit package changes."
  ];
  const generic = [
    "Read `agent/profile.json` and `agent/core-instructions.md`.",
    "Treat Serenity Agent as a direct-dialogue mode.",
    "Do not change protected source unless maintenance is explicit."
  ];

  if (normalizedHost === "codex") {
    return codex;
  }

  if (normalizedHost === "claude-code" || normalizedHost === "cloud-code") {
    return claude;
  }

  return generic;
}

function textContent(value) {
  return {
    content: [
      {
        type: "text",
        text: typeof value === "string" ? value : JSON.stringify(value, null, 2)
      }
    ]
  };
}

async function handleToolCall(name, args = {}) {
  if (name === "serenity_agent_profile") {
    return textContent(await loadProfileBundle());
  }

  if (name === "serenity_agent_entrypoint") {
    const host = typeof args.host === "string" ? args.host : "generic";
    return textContent({
      host,
      startup: entrypointForHost(host)
    });
  }

  if (name === "serenity_agent_maintenance_check") {
    const request = typeof args.request === "string" ? args.request : "";
    return textContent(classifyMaintenance(request));
  }

  return {
    isError: true,
    content: [
      {
        type: "text",
        text: `Unknown tool: ${name}`
      }
    ]
  };
}

if (process.env.SERENITY_AGENT_MCP_SMOKE === "1") {
  const bundle = await loadProfileBundle();
  console.log(JSON.stringify({
    ok: true,
    profileName: bundle.profile.name,
    toolNames: toolDefinitions.map((tool) => tool.name),
    coreBytes: bundle.coreInstructions.length
  }, null, 2));
  process.exit(0);
}

const server = new Server(
  {
    name: "serenity-agent",
    version: "0.1.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: toolDefinitions
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  return handleToolCall(name, args);
});

const transport = new StdioServerTransport();
await server.connect(transport);
