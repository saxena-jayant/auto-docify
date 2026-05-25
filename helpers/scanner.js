const fs = require("fs");
const path = require("path");

const scanProject = (projectPath) => {
  const info = {
    name: path.basename(projectPath),
    files: [],
    directories: [],
    packageJson: null,
    requirements: null,
    readme: null,
    mainFiles: [],
    configFiles: [],
  };

  const scanDir = (dirPath, depth = 0) => {
    if (depth > 3) return;

    try {
      const items = fs.readdirSync(dirPath);

      for (const item of items) {
        if (
          [
            "node_modules",
            ".git",
            ".gitignore",
            ".env",
            "dist",
            "build",
            "__pycache__",
            "venv",
            "vendor",
            ".devcontainer",
            ".next",
          ].includes(item)
        ) {
          continue;
        }

        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          info.directories.push(path.relative(projectPath, fullPath));
          scanDir(fullPath, depth + 1);
        } else {
          const ext = path.extname(item).toLowerCase();
          const relPath = path.relative(projectPath, fullPath);

          info.files.push({
            name: item,
            path: relPath,
            ext: ext,
          });

          if (
            [
              "index.js",
              "main.js",
              "app.js",
              "server.js",
              "index.ts",
              "main.ts",
              "app.ts",
              "main.py",
              "app.py",
              "index.py",
              "__main__.py",
              "main.go",
              "main.rs",
              "src/main.rs",
              "src/main.go",
              "Program.cs",
              "main.c",
              "main.cpp",
            ].includes(item)
          ) {
            info.mainFiles.push(relPath);
          }

          if (
            [
              "package.json",
              "requirements.txt",
              "Pipfile",
              "Cargo.toml",
              "go.mod",
              "pom.xml",
              "build.gradle",
              "tsconfig.json",
              ".env.example",
              "docker-compose.yml",
              "Dockerfile",
              "Makefile",
              "pyproject.toml",
              "setup.py",
            ].includes(item)
          ) {
            info.configFiles.push(relPath);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  scanDir(projectPath);
  return info;
};

module.exports = scanProject;
