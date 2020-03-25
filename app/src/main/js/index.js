import Root from './routes'

import {setupFrontendListener} from 'eiphop';

// listen to ipc responses
const electron = require('electron');
const log = require('electron-log');
setupFrontendListener(electron);

//////////////// ====================
const uuid = require('uuid/v4');
const { desktopCapturer, ipcRenderer } = electron;
let sourceId;


console.log = log.info;
console.warn = log.warn;
console.error = log.error;
log.catchErrors();

render(Root)

if (module.hot) {
  module.hot.accept('./routes.js', () => {
	  const newRoot = require('./routes').default;
	  render(newRoot)
  })
}