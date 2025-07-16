# FSL Standard CLI

> A command-line tool for quickly initializing frontend project standardization configurations

[![npm version](https://badge.fury.io/js/fsl-std-cli.svg)](https://badge.fury.io/js/fsl-std-cli)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## ✨ Features

**FSL Standard CLI** is a standardization configuration tool designed specifically for frontend projects, helping you quickly establish best practice configurations for your projects.

### 🎯 Core Features

- **🔧 Basic Configuration**: EditorConfig, npmrc, TypeScript, VS Code, Gitignore, PostCSS
- **✅ Quality Assurance**: Biome, Pre-commit hooks, Commitlint, Browserslist
- **📚 Advanced Features**: JSDoc documentation generation, Changelog automation
- **🤖 Interactive Configuration**: Select required configuration items through checkboxes
- **📦 Out-of-the-box**: Pre-configured best practices, no tedious setup required

## 🚀 Quick Start

### Installation

```bash
# Global installation
npm install -g fsl-std-cli

# Or using pnpm
pnpm add -g fsl-std-cli

# Or using yarn
yarn global add fsl-std-cli
```

### Basic Usage

Run in your project root directory:

```bash
fstd init
```

Then select the project settings you need according to the prompts:

```
? Project settings: (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ setEditorconfig
 ◉ setNpmrc
 ◉ setTypeScript
 ◉ setVSCode
 ◉ setGitignore
 ◉ setBiome
 ◉ setPrecommit
 ◉ setCommitlint
 ◉ setBrowserslistrc
 ◉ setJSDoc
 ◉ setChangelog
```

## 📋 Configuration Options

### Base Rules

| Configuration    | Description                     | Generated Files                                    |
| ---------------- | ------------------------------- | -------------------------------------------------- |
| **EditorConfig** | Unified editor configuration    | `.editorconfig`                                    |
| **Npmrc**        | npm configuration optimization  | `.npmrc`                                           |
| **TypeScript**   | TypeScript basic configuration  | `tsconfig.json`                                    |
| **VS Code**      | VS Code workspace configuration | `.vscode/settings.json`, `.vscode/extensions.json` |
| **Gitignore**    | Git ignore file configuration   | `.gitignore`                                       |

### Quality Rules

| Configuration    | Description                           | Related Dependencies   |
| ---------------- | ------------------------------------- | ---------------------- |
| **Biome**        | Biome                                 | `biome.json`           |
| **Pre-commit**   | Git pre-commit hooks                  | `husky`, `lint-staged` |
| **Commitlint**   | Commit message specification checking | `@commitlint/cli`      |
| **Browserslist** | Browser compatibility configuration   | `.browserslistrc`      |

### Advanced Rules

| Configuration | Description                  | Features                        |
| ------------- | ---------------------------- | ------------------------------- |
| **JSDoc**     | API documentation generation | Automatic project documentation |
| **Changelog** | Changelog automation         | Based on Conventional Commits   |

## 🛠 Development

### Local Development

```bash
# Clone the project
git clone https://github.com/your-username/fsl-std-cli.git
cd fsl-std-cli

# Install dependencies
pnpm install

# Build the project
pnpm build

# Local link
pnpm link --global

# Development mode (real-time compilation)
pnpm dev:watch
```

### Project Structure

```
fsl-std-cli/
├── bin/                    # CLI entry files
│   ├── entry.ts           # Main entry point
│   ├── fstd.ts            # CLI core logic
│   └── fstd.init.ts       # Initialization command
├── packages/
│   ├── script/            # Configuration method implementations
│   │   ├── config-methods/ # Various configuration methods
│   │   └── utils/         # Utility functions
│   └── template/          # Configuration file templates
│       └── config-files/  # Preset configuration files
├── package.json           # Main package configuration
└── pnpm-workspace.yaml    # Monorepo configuration
```

## 📝 Script Commands

```bash
# Build the project
pnpm build

# Development mode
pnpm dev

# Commit code (using Conventional Commits)
pnpm commit

# Generate documentation
pnpm generate-docs

# Generate changelog
pnpm version
```

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[ISC](https://opensource.org/licenses/ISC) © Chase Chen

## 🙏 Acknowledgments

Thanks to all open source projects and communities that contribute to frontend engineering standardization.
