#!/usr/bin/env node

const generateReadme = require("./index");

const args = process.argv.slice(2);
let projectPath = args[0] || process.cwd();
let apiKey = process.env.GROQ_API_KEY;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "-k" || args[i] === "--api-key") {
    apiKey = args[i + 1];
    i++;
  } else {
    projectPath = args[i];
  }
}

if (!apiKey) {
  console.error("❌ Error: GROQ_API_KEY required.");
  console.log("Usage: auto-readme <path> -k <api-key>");
  console.log("Or: set GROQ_API_KEY=*** auto-readme <path>");
  process.exit(1);
}

process.env.GROQ_API_KEY = apiKey;

console.log(`Generate README for: ${projectPath}`);

generateReadme(projectPath)
  .then(() => console.log("README Generated Successfully"))
  .catch((err) => {
    console.log("Error", err.message);
    process.exit(1);
  });
