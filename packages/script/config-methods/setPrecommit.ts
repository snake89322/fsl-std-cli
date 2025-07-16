import { spawnSync } from "node:child_process";
import path from "node:path";
import editJsonFile from "edit-json-file";
import {
  configStartLog,
  configSucceedLog,
  npmStartLog,
  npmSucceedLog,
} from "../utils";

export async function setPrecommit() {
  const module = "husky lint-staged";
  npmStartLog({ module });
  spawnSync("pnpm", ["i", "-D", "", "husky", "lint-staged"], {
    stdio: "inherit",
  });
  npmSucceedLog({ module });

  let config = "biome lint-stage";
  let packageJsonFile = editJsonFile(
    path.resolve(process.cwd(), "package.json"),
  );
  configStartLog({ config });
  packageJsonFile.set("lint-staged.editor/**/*\\.{tsx,ts,jsx,js}", [
    "pnpm exec biome format --write",
    "git add",
  ]);
  packageJsonFile.save();
  configSucceedLog({ config });

  config = "precommit";
  configStartLog({ config });
  packageJsonFile = editJsonFile(path.resolve(process.cwd(), "package.json"));
  packageJsonFile.set("scripts.precommit", "lint-staged");
  packageJsonFile.set("husky.hooks.pre-commit", "npm run precommit");
  packageJsonFile.save();
  configSucceedLog({ config });
}
