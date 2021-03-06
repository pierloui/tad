const url = require('url')
const path = require('path')
const log = require('electron-log')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let win = null

const createSetupInfo = () => {
  const platform = process.platform
  const appPath = app.getAppPath()
  const appDir = path.dirname(appPath)
  const appScriptPath = path.join(appDir, 'tad.sh')
  const exePath = app.getPath('exe')
  const exeDir = path.dirname(exePath)
  global.setupInfo = { platform, appDir, appScriptPath, exePath, exeDir }
}

export const showQuickStart = () => {
  if (!win) {
    createSetupInfo()
    win = new BrowserWindow({
      width: 850,
      height: 600
    })
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'quickstart.html'),
      protocol: 'file:',
      slashes: true
    }))
    win.on('close', e => {
      win = null
    })
  }
  win.show()
}
