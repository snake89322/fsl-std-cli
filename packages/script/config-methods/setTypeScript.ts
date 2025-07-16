import { spawnSync } from "node:child_process";
import { npmStartLog, npmSucceedLog } from "../utils";

export async function setTypeScript() {
  const module = "typescript";
  npmStartLog({ module });
  spawnSync("pnpm", ["i", "-D", "typescript"], { stdio: "inherit" });
  spawnSync("npx", ["tsc", "--init"], { stdio: "inherit" });
  npmSucceedLog({ module });
}
