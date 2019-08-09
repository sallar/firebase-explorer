import { app, BrowserWindow } from "electron";
import * as path from "path";
import { ipcMain as ipc } from "electron-better-ipc";
import admin from "./utils/firebase";

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(app.getAppPath(), "../preload.js")
    }
  });

  mainWindow.loadFile(path.join(app.getAppPath(), "../index.html"));
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.answerRenderer("get-collection", async (path: any) => {
  const data = await admin
    .firestore()
    .collection(path)
    .get();
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
});
