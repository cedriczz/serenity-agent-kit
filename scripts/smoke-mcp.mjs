import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const child = spawn(
  process.execPath,
  ["mcp-server/src/index.js"],
  {
    cwd: repoRoot,
    env: {
      ...process.env,
      SERENITY_AGENT_MCP_SMOKE: "1"
    },
    stdio: ["ignore", "pipe", "pipe"]
  }
);

let stdout = "";
let stderr = "";

child.stdout.setEncoding("utf8");
child.stderr.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  stdout += chunk;
});
child.stderr.on("data", (chunk) => {
  stderr += chunk;
});

const exitCode = await new Promise((resolve) => {
  child.on("close", resolve);
});

if (exitCode !== 0) {
  console.error(stderr);
  process.exit(exitCode ?? 1);
}

const result = JSON.parse(stdout);
if (!result.ok || !result.toolNames.includes("serenity_agent_profile")) {
  throw new Error("MCP smoke check did not return expected tool metadata.");
}

console.log("MCP smoke check passed.");
