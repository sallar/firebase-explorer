const { readFileSync } = require("fs");
const ipc = require("electron-better-ipc");

window.getCollection = async path => {
  const data = await ipc.callMain("get-collection", path);
  return data;
};

window.getDocument = async path => {
  const data = await ipc.callMain("get-document", path);
  return data;
};

window.getRoot = async path => {
  const data = await ipc.callMain("get-root");
  return data;
};
