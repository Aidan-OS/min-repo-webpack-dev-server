const electron = require('electron');
const { autoUpdater } = require('electron-updater');
const {ipcMain} = electron;
const { dialog } = electron;

const BrowserWindow = electron.BrowserWindow;

const url = require('url');
const fs = require('fs');
const os = require('os');
const log = require('electron-log');

console.log = log.info;
console.warn = log.warn;
console.error = log.error;
log.catchErrors();

const app = electron.app;
const menu = electron.Menu
const path = require('path');

const eapp = electron.app; 
const { JSONStorage } = require('node-localstorage');


require(path.join(__dirname, './res/sentry.js'));

if(!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
    autoUpdater.autoDownload = false;
    autoUpdater.on('error', (error) => {
        dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
    })
    autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = "info";

    autoUpdater.on('update-available', () => {


        dialog.showMessageBox({
            type: 'info',
            title: 'Found Updates',
            message: 'An update to app is available. You will be prompted to restart the application when the update is ready to install.\nDownload now?',
            buttons: ['Ok', 'Cancel']
        }, (buttonIndex) => {
            if (buttonIndex === 0) {
    	        console.log('starting downloadUpdate');
                autoUpdater.downloadUpdate()
            }
        })
    })
    autoUpdater.on('error', (ev, err) => {
        console.log('autoupdateerror', ev, err);
    })

    autoUpdater.on('update-not-available', () => {
        // dialog.showMessageBox({
        //   title: 'No Updates',
        //   message: 'Current version is up-to-date.'
        // })
    })

    autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox({
            title: 'Install Updates',
            message: 'Updates have been downloaded. Restart the application to apply the updates. Restart now?',
            buttons: ['Ok', 'Cancel']
        }, (buttonIndex) => {
  	        if (buttonIndex === 0) {
	            setImmediate(() =>
                {
                    console.log('starting quitAndInstall');
                    autoUpdater.quitAndInstall()
                })
	        }
        })
    })
    console.log('starting checkForUpdates');
    autoUpdater.checkForUpdates();
}