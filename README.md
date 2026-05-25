# auto-readme-generator

![Node.js](https://img.shields.io/badge/Node.js-≥18-339933?logo=node.js&logoColor=white)
![NPM Version](https://img.shields.io/npm/v/auto-readme-generator.svg?logo=npm)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Build](https://img.shields.io/github/actions/workflow/status/yourusername/auto-readme-generator/ci.yml?branch=main&label=CI)

## 📖 Description

**auto-readme-generator** is a lightweight CLI tool that automatically creates (or updates) a high‑quality `README.md` for any JavaScript/Node.js project. It scans your source files, extracts useful information, and leverages the **Groq** LLM API to craft a polished, ready‑to‑publish README.

Key capabilities:

* **Zero‑setup analysis** – walks through your project, gathers file names, imports, and JSDoc comments.
* **AI‑powered writing** – uses Groq’s LLM to turn raw data into human‑friendly documentation.
* **Existing README awareness** – reads and enhances an existing `README.md` instead of overwriting it.
* **Custom prompts** – tweak the generation prompt without touching the source code.

---

## 🚀 Quick Start

```bash
# 1️⃣ Clone the repo (or install globally)
git clone https://github.com/yourusername/auto-readme-generator.git
cd auto-readme-generator

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up your Groq API key
echo "GROQ_API_KEY=your_groq_key_here" > .env

# 4️⃣ Run the generator on a target project
node index.js /path/to/your/project
# or, if you installed it globally:
auto-readme-generator /path/to/your/project
```

After the command finishes, a fresh `README.md` will appear (or be updated) in the target directory.

---

## 🛠️ Installation

### As a development dependency (recommended)

```bash
npm i -D auto-readme-generator
```

### As a global CLI

```bash
npm i -g auto-readme-generator
```

### Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | >= 18 |
| **npm**     | >= 8   |
| **Groq API key** | Obtain from <https://groq.com> |

---

## 📦 Usage

### CLI Syntax

```bash
auto-readme-generator [options] <projectPath>
```

| Option | Alias | Description |
|--------|-------|-------------|
| `-h`   | `--help` | Show help information |
| `-o`   | `--output <file>` | Write README to a custom file (default: `README.md`) |
| `-p`   | `--prompt <file>` | Use a custom JSON/YAML prompt file (overrides the built‑in prompt) |
| `-c`   | `--config <file>` | Load additional environment variables from a specified file |

### Example

```bash
# Generate a README for the current working directory
auto-readme-generator .

# Specify a custom output file
auto-readme-generator -o DOCS.md /my/project

# Use a custom prompt file
auto-readme-generator -p ./my-prompt.json /my/project
```

### Programmatic API

If you prefer to call the generator from another Node script:

```js
const { generateReadme } = require('auto-readme-generator');

(async () => {
  const markdown = await generateReadme({
    projectPath: '/my/project',
    // optional: customPromptPath, outputPath, etc.
  });

  console.log(markdown);
})();
```

---

## ✨ Features

| ✅ | Feature |
|----|---------|
| ✅ | **File‑system scanner** – walks through `helpers/`, `src/`, etc., and collects metadata |
| ✅ | **Existing README reader** – parses current `README.md` to preserve hand‑crafted sections |
| ✅ | **AI call abstraction** – `helpers/AICall.js` handles all communication with the Groq API |
| ✅ | **Prompt templating** – `helpers/prompt.js` builds a context‑aware prompt for the LLM |
| ✅ | **Analyzer** – `helpers/analyzer.js` extracts function signatures, exported modules, and JSDoc comments |
| ✅ | **Configurable via `.env`** – store your API key and optional model settings |
| ✅ | **CLI with helpful flags** – quick, one‑liner generation |
| 🔜 | **Template overrides** – provide your own markdown skeleton |
| 🔜 | **Multi‑model support** – switch between Groq models or other LLM providers |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | **Node.js** (v18+) |
| CLI Framework | Native `process.argv` handling (no external CLI lib) |
| AI Provider | **groq-sdk** |
| Env Management | **dotenv** |
| Code Analysis | Custom scanners (`helpers/scanner.js`, `helpers/analyzer.js`) |
| Testing (future) | Jest / Vitest (placeholder) |

---

## 🤝 Contributing

Contributions are welcome! Follow these steps to get started:

1. **Fork** the repository.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/yourusername/auto-readme-generator.git
   cd auto-readme-generator
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/awesome-new-feature
   ```
4. **Install dependencies** and set up the environment (see Installation above).
5. **Make your changes**. Keep code style consistent and add unit tests where applicable.
6. **Run the test suite** (once tests are added):
   ```bash
   npm test
   ```
7. **Commit** with a clear message and **push** to your fork.
8. Open a **Pull Request** against `main`. Include a short description of the change and, if relevant, screenshots or CLI output.

### Code of Conduct

Please be respectful and follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).

---

## 📝 License

Distributed under the **MIT License**. See the `LICENSE` file for details.

---

## 🔧 Configuration

The tool reads environment variables from a `.env` file placed at the project root (or the directory from which you run the CLI).

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key (used for all LLM calls) | ✅ |
| `GROQ_MODEL`   | (Optional) Model name, e.g., `mixtral-8x7b-32768` | ❌ |
| `MAX_TOKENS`   | (Optional) Maximum tokens for the completion | ❌ |
| `TEMPERATURE`  | (Optional) Sampling temperature (0‑1) | ❌ |

Example `.env`:

```dotenv
GROQ_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
GROQ_MODEL=mixtral-8x7b-32768
MAX_TOKENS=2048
TEMPERATURE=0.7
```

> **Tip:** Never commit your `.env` file. Add it to `.gitignore` (already present in the repo).

---

## 📚 Related Projects & Resources

* [Groq SDK Documentation](https://github.com/groq/groq-node)
* [Node.js File System (fs) API](https://nodejs.org/api/fs.html)
* [dotenv – Loads environment variables from .env](https://github.com/motdotla/dotenv)

---

Happy documenting! 🎉