const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 340,
    height: 524,
    webPreferences: {
      nodeIntegration: true
    },
    maximizable: false,
    // frame: false,
    resizable: false
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.removeMenu();
  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
