const { readFileSync } = require("fs");
const { ipcRenderer: ipc } = require("electron-better-ipc");

window.readConfig = function() {
  const data = readFileSync(
    "./test-65bcf-firebase-adminsdk-253z8-eb531283c9.json",
    { encoding: "utf8" }
  );
  return data;
};

window.getCollection = async path => {
  const data = await ipc.callMain("get-collection", path);
  return data;
};
