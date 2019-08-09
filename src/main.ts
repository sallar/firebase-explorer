import { app, BrowserWindow } from "electron";
import * as path from "path";
import admin from "./utils/firebase";
import { firestore } from "firebase-admin";

const ipc = require("electron-better-ipc");

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

ipc.answerRenderer("get-root", async () => {
  const docs = await admin.firestore().listCollections();
  return docs.map(col => ({
    id: col.id,
    path: col.path
  }));
});

ipc.answerRenderer("get-collection", async (path: any) => {
  const docs = await admin
    .firestore()
    .collection(path)
    .get();
  return docs.docs.map(doc => ({ id: doc.id, path: doc.ref.path }));
});

ipc.answerRenderer("get-document", async (path: any) => {
  const docRef = admin.firestore().doc(path);
  const docData = await docRef.get();
  const docCollections = await docRef.listCollections();

  return {
    data: docData.data(),
    collections: docCollections.map(col => ({
      id: col.id,
      path: col.path
    }))
  };
});
