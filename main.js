'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const server = require('./server');

const powerSaveBlocker = require('electron').powerSaveBlocker;
var id = powerSaveBlocker.start('prevent-display-sleep');
console.log(powerSaveBlocker.isStarted(id));

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, kiosk:true, autoHideMenuBar:true});

  mainWindow.maximize();
  mainWindow.loadURL('file://' + __dirname + '/build/index.html');

  // opens Dev tools
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
