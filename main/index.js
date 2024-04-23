import { app, BrowserWindow } from "electron"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { setToggleMaximizedEvent } from "./windowEventHandlers.js"
import "./fsEventHandler.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

export let mainWindow
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, "../preload/index.js")
        }
    })
    setToggleMaximizedEvent()

    if (app.isPackaged) {
        mainWindow.loadFile("../dist/index.html")
    } else {
        mainWindow.loadURL("http://localhost:5173/")
    }
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("ready", () => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
