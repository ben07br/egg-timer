const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 560,
    resizable: false,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const { ipcMain } = require('electron');

ipcMain.on('minimize', (event) => {
  BrowserWindow.getFocusedWindow().minimize();
});
ipcMain.on('close', (event) => {
  BrowserWindow.getFocusedWindow().close();
});