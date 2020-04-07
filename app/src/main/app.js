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

const createMenu = () => {
	const application = {
		label: 'Application',
		submenu: [{
				label: 'About Application',
				role: 'about',
			},
			{
				type: 'separator',
			},
			{
				label: 'Quit',
				accelerator: 'Command+Q',
				click: () => {
					electron.app.quit();
				},
			},
		],
	};

	const edit = {
		label: 'Edit',
		submenu: [{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+Z',
				role: 'undo',
			},
			{
				label: 'Redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				role: 'redo',
			},
			{
				type: 'separator',
			},
			{
				label: 'Cut',
				accelerator: 'CmdOrCtrl+X',
				role: 'cut',
			},
			{
				label: 'Copy',
				accelerator: 'CmdOrCtrl+C',
				role: 'copy',
			},
			{
				label: 'Paste',
				accelerator: 'CmdOrCtrl+V',
				role: 'paste',
			},
			{
				label: 'Select All',
				accelerator: 'CmdOrCtrl+A',
				role: 'selectAll',
			},
		],
	};

	const template = [application, edit];

	electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(template));
};