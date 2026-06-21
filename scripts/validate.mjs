import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const requiredFiles = [
  ".codex-plugin/plugin.json",
  ".mcp.json",
  "agent/profile.json",
  "agent/core-instructions.md",
  "agent/maintenance-protocol.md",
  "skills/serenity-agent/SKILL.md",
  "skills/serenity-agent/agents/openai.yaml",
  "claude-code/.claude/skills/serenity-agent/SKILL.md",
  "claude-code/.claude/commands/serenity.md",
  "claude-code/.claude/agents/serenity-agent.md",
  "mcp-server/src/index.js",
  "README.md"
];

async function readUtf8(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing required file: ${relativePath}`);
}

const allText = await Promise.all(requiredFiles.map(readUtf8));
for (const [index, text] of allText.entries()) {
  assert(!text.includes("\uFFFD"), `Replacement character found in ${requiredFiles[index]}`);
}

const plugin = JSON.parse(await readUtf8(".codex-plugin/plugin.json"));
assert(plugin.name === "serenity-agent", "Plugin name must be serenity-agent");
assert(plugin.mcpServers === "./.mcp.json", "Plugin must point to .mcp.json");
assert(plugin.skills === "./skills/", "Plugin must point to skills/");
assert(Array.isArray(plugin.interface.defaultPrompt), "defaultPrompt must be an array");
assert(plugin.interface.defaultPrompt.length <= 3, "defaultPrompt may include at most 3 entries");

const profile = JSON.parse(await readUtf8("agent/profile.json"));
assert(profile.maintenanceModeRequiresExplicitRequest === true, "Maintenance mode must require explicit request");
assert(profile.entrypoints.codex === "skills/serenity-agent/SKILL.md", "Codex entrypoint mismatch");

const codexSkill = await readUtf8("skills/serenity-agent/SKILL.md");
assert(codexSkill.includes("../../agent/core-instructions.md"), "Codex skill must reference shared core instructions");

const claudeSkill = await readUtf8("claude-code/.claude/skills/serenity-agent/SKILL.md");
assert(claudeSkill.includes("agent/core-instructions.md"), "Claude Code skill must reference shared core instructions");

console.log("Repository validation passed.");
