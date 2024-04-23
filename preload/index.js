const { contextBridge, ipcRenderer } = require("electron")

const base = "blog/static"
function fileOperationFactory(path, {emitMsg, listenMsg, resCallback}, ...args) {
    return new Promise((res, _rej) => {
        const fullPath = base + path
        ipcRenderer.invoke(emitMsg, fullPath, ...args)
        ipcRenderer.once(listenMsg, (_e, ...args) => resCallback(res, ...args))
    })
}
contextBridge.exposeInMainWorld("fileOperation", {
    delete: path => fileOperationFactory(path, {
        emitMsg: "fs:delete",
        listenMsg: "fs:delete-done",
        resCallback: res => res(),
    }),
    rename: (oldPath, newPath) => fileOperationFactory(oldPath, {
        emitMsg: "fs:rename",
        listenMsg: "fs:rename-done",
        resCallback: res => res(),
    }, base + newPath),

    readFile: path => fileOperationFactory(path, {
        emitMsg: "fs:read-file",
        listenMsg: "fs:read-file-done",
        resCallback: (res, fileContent) => res(fileContent),
    }),
    writeFile: (path, content) => fileOperationFactory(path, {
        emitMsg: "fs:write-file",
        listenMsg: "fs:write-file-done",
        resCallback: res => res(),
    }, content),

    createFolder: path => fileOperationFactory(path, {
        emitMsg: "fs:create-folder",
        listenMsg: "fs:create-folder-done",
        resCallback: res => res(),
    }),
    readFolder: path => fileOperationFactory(path, {
        emitMsg: "fs:read-folder",
        listenMsg: "fs:read-folder-done",
        resCallback: (res, folderContent) => res(folderContent),
    }),
})

contextBridge.exposeInMainWorld("windowOperation", {
    minimize    : () => ipcRenderer.invoke("minimize"),
    maximize    : () => ipcRenderer.invoke("maximize"),
    isMaximized : () => ipcRenderer.invoke("isMaximized"),
    onToggleMaximized: callback =>
        ipcRenderer.on("window:toggle-maximized", isMaximized =>
            callback(isMaximized)),

    restore : () => ipcRenderer.invoke("restore"),
    close   : () => ipcRenderer.invoke("close"),

    setWindowBgColor: color => ipcRenderer.invoke("window:bg-color", color)
})
