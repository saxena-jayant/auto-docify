# auto-docify

![Node.js](https://img.shields.io/badge/Node.js-≥18-339933?logo=node.js&logoColor=white)
![NPM Version](https://img.shields.io/npm/v/auto-docify.svg?logo=npm)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📖 Description

**auto-docify** is a lightweight CLI tool that automatically creates (or updates) a high‑quality `README.md` for any project. It scans your source files, extracts useful information, and leverages the **Groq** LLM API to craft polished documentation.

Key capabilities:

- **File scanning** – walks through your project and collects file names, structure, and metadata
- **AI‑powered writing** – uses Groq's LLM to generate human‑friendly documentation
- **Existing README awareness** – reads and enhances an existing `README.md` instead of overwriting it
- **Your API key** – users provide their own Groq API key (no shared keys)

---

## 🚀 Quick Start

### 1. Install globally

```bash
npm install -g auto-docify
```

### 2. Get your Groq API key

Get a free API key from [https://groq.com](https://groq.com)

### 3. Run the generator

```bash
auto-docify "/path/to/your/project" -k "your_groq_api_key"
```

After the command finishes, a fresh `README.md` will appear in the target directory.

---

## 🛠️ Installation

### As a global CLI

```bash
npm install -g auto-docify
```

### As a development dependency

```bash
npm install -D auto-docify
```

### Prerequisites

| Requirement      | Version                                          |
| ---------------- | ------------------------------------------------ |
| **Node.js**      | >= 18                                            |
| **npm**          | >= 8                                             |
| **Groq API key** | Obtain from [https://groq.com](https://groq.com) |

---

## 📦 Usage

### CLI Syntax

```bash
auto-docify [options] <projectPath>
```

| Option | Alias       | Description                  |
| ------ | ----------- | ---------------------------- |
| `-k`   | `--api-key` | Your Groq API key (required) |
| `-h`   | `--help`    | Show help information        |

### Examples

```bash
# Generate README for a project (required -k flag)
auto-docify "/path/to/project" -k "gsk_xxxxxxxx"

# Generate README for current directory
auto-docify . -k "gsk_xxxxxxxx"

# Show help
auto-docify --help
```

### Using with node directly

```bash
# Set API key as environment variable
set GROQ_API_KEY=your_key
node index.js "/path/to/project"
```

### Programmatic API

If you prefer to call the generator from another Node script:

```javascript
const generateReadme = require("auto-docify");

(async () => {
  const markdown = await generateReadme("/my/project", {
    apiKey: "gsk_xxxxxxxx",
  });

  console.log("README generated!");
})();
```

Or using environment variable:

```javascript
process.env.GROQ_API_KEY = "gsk_xxxxxxxx";

const generateReadme = require("auto-docify");

await generateReadme("/my/project");
```

---

## ✨ Features

| Feature | Description                                                            |
| ------- | ---------------------------------------------------------------------- |
| ✅      | **File scanner** – walks through project and collects metadata         |
| ✅      | **Existing README reader** – parses current README to preserve content |
| ✅      | **AI integration** – uses Groq API for generating documentation        |
| ✅      | **Custom prompts** – builds context‑aware prompts for the LLM          |
| ✅      | **Project analyzer** – detects language, tech stack, and structure     |
| ✅      | **CLI interface** – quick, one‑liner generation                        |
| ✅      | **Programmatic API** – use as a library in your own code               |

---

## 🏗️ Tech Stack

| Layer          | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| Runtime        | **Node.js** (v18+)                                            |
| CLI Framework  | Native `process.argv` handling                                |
| AI Provider    | **groq-sdk**                                                  |
| Env Management | **dotenv**                                                    |
| Code Analysis  | Custom scanners (`helpers/scanner.js`, `helpers/analyzer.js`) |

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/yourusername/auto-docify.git
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/awesome-new-feature
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Make your changes** and test locally:
   ```bash
   node index.js /test/project -k "your_key"
   ```
6. **Commit** and **push** to your fork
7. Open a **Pull Request**

---

## 📝 License

Distributed under the **MIT License**. See the `LICENSE` file for details.

---

## 📚 Related Projects & Resources

- [Groq SDK Documentation](https://github.com/groq/groq-node)
- [Node.js File System API](https://nodejs.org/api/fs.html)
- [dotenv – Environment variables](https://github.com/motdotla/dotenv)

---

Happy documenting! 🎉
