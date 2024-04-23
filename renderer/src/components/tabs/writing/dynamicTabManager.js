import { reactive } from "vue"

let currentActiveTab = "files"
export const tabMap = reactive(new Map([
    ["preview", { active: false }],
    ["files"  , { active: true  }],
]))

export function newTab(tabId, tabName, tabType) {
    if (tabMap.has(tabId)) {
        return null
    }
    const tabIndex = tabMap.size - 2
    tabMap.set(tabId, {
        name: tabName,
        type: tabType,
        index: tabIndex,
        active: false,
        edited: false,
    })
    return tabIndex
}

export function closeTab(tabId) {
    switchTab("files")
    tabMap.delete(tabId)
}

export function switchTab(tabId) {
    tabMap.get(currentActiveTab).active = false
    tabMap.get(tabId).active = true
    currentActiveTab = tabId
}

export function renameTab(oldId, newId, newName) {
    const originalTabItem = tabMap.get(oldId)
    originalTabItem.name = newName
    tabMap.delete(oldId)
    tabMap.set(newId, originalTabItem)
}
