const { app, BrowserWindow } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 420,
    height: 560,
    resizable: false,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
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
ipcMain.on('timer-finished', () => {
  if (win) {
    win.show();
    win.focus();
  }
});