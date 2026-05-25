const scanProject = require("./helpers/scanner");
const analyzer = require("./helpers/analyzer");
const readmeReader = require("./helpers/existingReadmeReader");
const prompt = require("./helpers/prompt");
const AICall = require("./helpers/AICall");
const fs = require("fs").promises;
const path = require("path");

const generateReadme = async (dirPath, options = {}) => {
  const apiKey = options.apiKey || process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is required. Pass it as generateReadme(path, { apiKey: '...' }) " +
        "or set process.env.GROQ_API_KEY before calling.",
    );
  }

  process.env.GROQ_API_KEY = apiKey;

  const dirInfo = scanProject(dirPath);
  const analysisResult = analyzer(dirPath, dirInfo);
  const readme = readmeReader(dirPath, analysisResult);
  const promptData = prompt(readme);
  const AIData = await AICall(promptData);
  const READMEData = AIData.choices[0]?.message.content;

  await fs.writeFile(path.join(dirPath, "README.md"), READMEData, "utf-8");
  console.log("Completed");
};

module.exports = generateReadme;

//CLI mode

if (require.main == module) {
  const dirPath = process.argv[2] || process.cwd();
  generateReadme(dirPath).catch(console.error);
}
