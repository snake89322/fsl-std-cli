import { spawnSync } from "node:child_process";
import { npmStartLog, npmSucceedLog } from "../utils";

export async function setBiome() {
  // biome setting
  const module = "biome";
  npmStartLog({ module });
  spawnSync("pnpm", ["i", "-D", "-E", "biome"], {
    stdio: "inherit",
  });

  spawnSync("pnpm", ["exec", "biome", "init"], { stdio: "inherit" });
  npmSucceedLog({ module });
}
