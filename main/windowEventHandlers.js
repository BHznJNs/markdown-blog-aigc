import { ipcMain } from "electron"
import { mainWindow } from "./index.js"

export function setToggleMaximizedEvent() {
    mainWindow.on("maximize", () =>
        mainWindow.webContents.send("window:toggle-maximized", true))
    mainWindow.on("unmaximize", () =>
        mainWindow.webContents.send("window:toggle-maximized",))
}

ipcMain.handle("minimize"   , () => mainWindow.minimize())
ipcMain.handle("maximize"   , () => mainWindow.maximize())
ipcMain.handle("isMaximized", () => mainWindow.isMaximized())
ipcMain.handle("restore"    , () => mainWindow.unmaximize()) 
ipcMain.handle("close"      , () => mainWindow.close())

ipcMain.handle("window:bg-color", (_e, color) =>
    mainWindow.setBackgroundColor(color))