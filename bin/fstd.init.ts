import * as configMethods from "@fsl-std-cli/script/config-methods";
import { checkbox, Separator } from "@inquirer/prompts";
import chalk from "chalk";
import { program } from "commander";

program
  .command("init")
  .description(chalk.cyanBright("Init project settings:"))
  .action(async () => {
    const answer = await checkbox({
      message: "Project settings:",
      choices: [
        new Separator(chalk.cyanBright(" = The Base Rules = ")),
        {
          value: "setEditorconfig",
          checked: true,
        },
        {
          value: "setNpmrc",
          checked: true,
        },
        {
          value: "setTypeScript",
          checked: true,
        },
        {
          value: "setVSCode",
          checked: true,
        },
        {
          value: "setGitignore",
          checked: true,
        },

        new Separator(chalk.greenBright(" = The Quality Rules = ")),
        {
          value: "setBiome",
          checked: true,
        },
        {
          value: "setPrecommit",
          checked: true,
        },
        {
          value: "setCommitlint",
          checked: true,
        },
        {
          value: "setBrowserslistrc",
          checked: true,
        },

        new Separator(chalk.magentaBright(" = The Advance Rules = ")),
        {
          value: "setJSDoc",
          checked: true,
        },
        {
          value: "setChangelog",
          checked: true,
        },

        new Separator(" = The End = "),
      ],
      validate(answer) {
        if (answer.length < 1) {
          return "You must choose at least one topping.";
        }

        return true;
      },
    });

    if (answer.includes("setNpmrc")) {
      await configMethods.setNpmrc?.();
    }

    for (const functionName of answer) {
      await configMethods[functionName as keyof typeof configMethods]?.();
    }
  });
