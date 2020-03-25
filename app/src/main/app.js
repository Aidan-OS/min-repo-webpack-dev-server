const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

const url = require('url');
const fs = require('fs');
const os = require('os');
const path = require('path');

let mainWindow;

function createWindow() {
    if (process.platform === 'darwin') {
        // Create our menu entries so that we can use MAC shortcuts
        createMenu()
    }
    
    mainWindow = new BrowserWindow({
        width: 1124,
        height: 768,
        minWidth: 1124,
        minHeight: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, './res/sentry.js'),
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    if(process.env.NODE_ENV === 'development') {
    const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS
    } = require('electron-devtools-installer');
        // Open the DevTools.
        mainWindow.webContents.openDevTools();

        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));

        installExtension(REDUX_DEVTOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));

    }
}


app.on('ready', createWindow);


app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
        createWindow();
  }
});

app.on('window-all-closed', () => {
 app.quit();
});