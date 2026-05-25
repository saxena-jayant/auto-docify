const fs = require("fs");
const path = require("path");

const analyzer = (projectPath, info) => {
  const pkgPath = path.join(projectPath, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      info.packageJson = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      info.name = info.packageJson.name || info.name;
    } catch (error) {
      console.log(error.message);
    }
  }

  const reqPath = path.join(projectPath, "requirements.txt");
  if (fs.existsSync(reqPath)) {
    try {
      info.requirements = fs.readFileSync(reqPath, "utf-8").trim();
    } catch (error) {
      console.log(error.message);
    }
  }
  return info;
};

module.exports = analyzer;
