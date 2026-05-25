const fs = require("fs");
const path = require("path");

const readmeReader = (projectPath, info) => {
  ["README.md", "README.txt", "readme.md", "readme.txt"].forEach((f) => {
    const readmePath = path.join(projectPath, f);
    try {
      if (fs.existsSync(readmePath)) {
        info.readme = fs.readFileSync(readmePath, "utf-8").slice(0, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  return info;
};

module.exports = readmeReader;
