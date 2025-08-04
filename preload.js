const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  minimize: () => ipcRenderer.send('minimize'),
  close: () => ipcRenderer.send('close'),
  notifyFinished: () => ipcRenderer.send('timer-finished')
});
