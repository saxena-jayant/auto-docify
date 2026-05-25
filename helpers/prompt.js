const prompt = (info) => {
  const filesSummary = info.files
    .slice(0, 30)
    .map((f) => `${f.path} (${f.ext})`)
    .join(", ");
  const dirsSummary = info.directories.slice(0, 15).join(", ");

  let prompt = `You are a README generator. Analyze this project and create a comprehensive README.md file.

## Project Structure
- **Name**: ${info.name}
- **Main Files**: ${info.mainFiles.join(", ") || "None detected"}
- **Config Files**: ${info.configFiles.join(", ") || "None detected"}
- **Directories**: ${dirsSummary || "None"}
- **Key Files**: ${filesSummary}

`;

  if (info.packageJson) {
    prompt += `## Package.json Info
- **Description**: ${info.packageJson.description || "Not specified"}
- **Scripts**: ${Object.keys(info.packageJson.scripts || {}).join(", ")}
- **Dependencies**: ${Object.keys(info.packageJson.dependencies || {})
      .slice(0, 10)
      .join(", ")}
- **Dev Dependencies**: ${Object.keys(info.packageJson.devDependencies || {})
      .slice(0, 5)
      .join(", ")}

`;
  }

  if (info.requirements) {
    prompt += `## Python Requirements
${info.requirements.slice(0, 500)}

`;
  }

  if (info.readme) {
    prompt += `## Existing README (for reference)
${info.readme}

`;
  }

  prompt += `## Your Task
Generate a complete, professional README.md for this project. Include:

1. **Badges** (optional - use generic ones if appropriate)
2. **Project Title & Description** - What this project does
3. **🚀 Quick Start** - How to get started quickly
4. **🛠️ Installation** - Step-by-step install instructions
5. **📖 Usage** - How to use with code examples
6. **✨ Features** - Key features (infer from code/structure)
7. **🏗️ Tech Stack** - Technologies used
8. **🤝 Contributing** - How to contribute
9. **📝 License** - License info (default to MIT if unknown)
10. **🔧 Configuration** - Any env vars or config needed

IMPORTANT: 
- Write in clear, concise English
- Use proper markdown formatting
- Infer project purpose from file names, code, and structure
- If you can't determine something, make reasonable assumptions or mark as "Coming soon"
- Keep it professional but friendly
- Do NOT use placeholder text like "[your-project-name]" - use "${info.name}" or infer the real name

Generate ONLY the README.md content, no explanations:`;

  return prompt;
};

module.exports = prompt;
