const fs = require("fs");
const path = require("path");
const os = require("os");

const SETTINGS_PATH = path.join(os.homedir(), ".renamecheetah-settings.json");

const DEFAULTS = {
  scripts: [],
};

function load() {
  try {
    const saved = JSON.parse(fs.readFileSync(SETTINGS_PATH, "utf8"));
    return { ...DEFAULTS, ...saved };
  } catch {
    return { ...DEFAULTS };
  }
}

function save(settings) {
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf8");
}

module.exports = { load, save };
