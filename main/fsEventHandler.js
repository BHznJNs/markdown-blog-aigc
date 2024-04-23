import { ipcMain } from "electron"
import trash from "trash"
import { readdirSync, mkdirSync, readFileSync, statSync, writeFileSync, renameSync } from "node:fs"
import { mainWindow } from "./index.js"

ipcMain.handle("fs:delete", async (_e, path) => {
    await trash(path, { glob: false })
    mainWindow.webContents.send("fs:delete-done")
})

ipcMain.handle("fs:rename", (_e, oldPath, newPath) => {
    renameSync(oldPath, newPath)
    mainWindow.webContents.send("fs:rename-done")
})

ipcMain.handle("fs:read-file", (_e, path) => {
    const readResult = readFileSync(path, "utf-8")
    mainWindow.webContents.send("fs:read-file-done", readResult)
})

ipcMain.handle("fs:write-file", (_e, path, content) => {
    writeFileSync(path, content)
    mainWindow.webContents.send("fs:write-file-done")
})

ipcMain.handle("fs:create-folder", (_e, path) => {
    mkdirSync(path)
    mainWindow.webContents.send("fs:create-folder-done")
})

ipcMain.handle("fs:read-folder", (_e, path) => {
    const readResult = readdirSync(path)
        .map(filename => {
            const stat = statSync(path + filename)
            const isFile = stat.isFile()
            const createTime = stat.birthtime.getTime()
            return { fn: filename, ct: createTime, if: isFile ? 1 : 0 }
        })
    mainWindow.webContents.send("fs:read-folder-done", readResult)
})
