const prompt = (info) => {
  const filesSummary = info.files
    .slice(0, 15)
    .map((f) => `${f.path} (${f.ext})`)
    .join(", ");
  const dirsSummary = info.directories.slice(0, 8).join(", ");

  let p = `Generate a professional, complete README.md for this project.

PROJECT:
- Name: ${info.name}
- Main Files: ${info.mainFiles.join(", ") || "None"}
- Directories: ${dirsSummary || "None"}
- Files: ${filesSummary}`;

  if (info.packageJson) {
    p += `
- Description: ${info.packageJson.description || "N/A"}
- Scripts: ${Object.keys(info.packageJson.scripts || {}).join(", ")}
- Dependencies: ${Object.keys(info.packageJson.dependencies || {})
      .slice(0, 10)
      .join(", ")}
- Dev Dependencies: ${Object.keys(info.packageJson.devDependencies || {})
      .slice(0, 5)
      .join(", ")}`;
  }

  if (info.requirements) {
    p += `\n- Requirements: ${info.requirements.slice(0, 300)}`;
  }

  if (info.readme) {
    p += `\nEXISTING README:\n${info.readme.slice(0, 800)}`;
  }

  p += `

Create a README with these sections:
1. **Badges** - Add relevant badges (Node.js, npm, License)
2. **Description** - What this project does (1-2 sentences)
3. **Quick Start** - Install & run in 3-4 steps
4. **Installation** - As CLI or dependency
5. **Usage** - CLI syntax + code example
6. **Features** - 5-7 key features as a table or bullet list
7. **Tech Stack** - Technologies used (table format)
8. **Contributing** - How to contribute (basic template)
9. **License** - MIT

RULES:
- Use "${info.name}" as project name (NOT placeholder)
- Output ONLY markdown, no explanations
- Keep it under 600 words
- Use clear, friendly tone
- Include actual commands based on the project's scripts/structure
- Infer purpose from file names and code structure

Generate the complete README.md now:`;

  return p;
};

module.exports = prompt;
