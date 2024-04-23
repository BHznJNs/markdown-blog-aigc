<script setup>
import { ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import ToolBar from "./tool-bar.vue"
import FileItem from "./file-item.vue"
import InputDialog from "../../../general/dialog/input-dialog.vue"
import TextInput from "../../../general/input/text-input.vue"
import { FolderType, MarkdownType, ImageType, AudioType, VideoType, OtherType } from "./fileTypes.js"

const path = ["/"]
const itemSelectedSet = new Set()
const { t } = useI18n()
const emit = defineEmits([
    "openArticle",
    "renameArticle",
])

const isAtRoot = ref(true)
const itemList = ref([])
const folderAddDialog = ref(null)
const folderAddInput = ref(null)
const articleAddDialog = ref(null)
const articleAddInput = ref(null)
const itemRenameDialog = ref(null)
const itemRenameInput = ref(null)

async function render() {
    const readContent = await fileOperation.readFolder(path.join(""))
    itemList.value = readContent.map(({fn: name, ct: date, if: isFile}, index) => {
        return {
            id: index,
            name, date,
            selected: false,
            type: !isFile
                ? FolderType
                : fileTypeResolver(name)
        }
    })
}

async function openFolder(folderName) {
    path.push(folderName)
    isAtRoot.value = path.length === 1
    await render()
}

function openArticle(filename) {
    const filepath = path.join("") + filename
    emit("openArticle", {
        path: filepath,
        name: filename,
    })
}

function selectItem(id) {
    const targetFileItem = itemList.value[id]
    const selected = targetFileItem.selected = !targetFileItem.selected
    itemSelectedSet[selected ? "add" : "delete"](targetFileItem)

    if (itemSelectedSet.size === 1) {
        itemRenameInput.value.setValue(targetFileItem.name)
    } else {
        itemRenameInput.value.clear()
    }
}

async function articleAddHandler() {
    let filename = articleAddInput.value.value
    if (!checkItemnameValid(filename)           ) return
    if (!filename.endsWith(".md")               ) filename += ".md"
    if (checkItemExist(filename, itemList.value)) return

    articleAddInput.value.clear()
    await fileOperation.writeFile(path.join("") + filename, "")
    await render()
    openArticle(filename)
}

async function folderAddHandler() {
    let folderName = folderAddInput.value.value
    if (!checkItemnameValid(folderName)           ) return
    if (checkItemExist(folderName, itemList.value)) return

    folderAddInput.value.clear()
    await fileOperation.createFolder(path.join("") + folderName)
    await render()
}

async function itemRenameHandler() {
    const targetItem = itemSelectedSet.values().next()
    const base = path.join("")
    const oldName = targetItem.value.name
    const newName = itemRenameInput.value.value
    const oldPath = base + oldName
    const newPath = base + newName
    await fileOperation.rename(oldPath, newPath)
    await render()
    emit("renameArticle", oldPath, newPath, newName)
}

async function deleteSelected() {
    for (const item of itemSelectedSet) {
        await fileOperation.delete(path.join("") + item.name)
    }
    itemSelectedSet.clear()
    await render()
}

async function back() {
    if (path.length === 1) {
        return
    }

    path.pop()
    isAtRoot.value = path.length === 1
    await render()
}

onMounted(async () => await render())
</script>

<template>
<div class="file-browser">
    <InputDialog
        ref="articleAddDialog"
        @returnValue="articleAddHandler"
        @cancel="() => articleAddInput.clear()"
    >
        <template #header>{{ t("dialog.articleAddTitle") }}</template>
        <template #input>
            <TextInput
                ref="articleAddInput"
                :pattern="'[^\\\\^\\/]*'"
                :placeholder="t('dialog.articleNamePrompt')"
            >
                <template #suffix>.md</template>
            </TextInput>
        </template>
    </InputDialog>
    <InputDialog
        ref="folderAddDialog"
        @returnValue="folderAddHandler"
        @cancel="() => folderAddInput.clear()"
    >
        <template #header>{{ t("dialog.folderAddTitle") }}</template>
        <template #input>
            <TextInput
                ref="folderAddInput"
                :pattern="'[^\\\\^\\/]*'"
                :placeholder="t('dialog.folderNamePrompt')"
            />
        </template>
    </InputDialog>
    <InputDialog
        ref="itemRenameDialog"
        @returnValue="itemRenameHandler"
    >
        <template #header>{{ t("dialog.itemRenameTitle") }}</template>
        <template #input>
            <TextInput ref="itemRenameInput" :placeholder="t('dialog.itemNamePrompt')"/>
        </template>
    </InputDialog>

    <div class="folder-view">
        <FileItem
            v-for="item of itemList"
            v-bind="item"
            @select="selectItem"
            @openFolder="openFolder"
            @openArticle="openArticle"
        />
    </div>
    <ToolBar
        @add="      () => articleAddDialog.showModal()"
        @addFolder="() => folderAddDialog .showModal()"
        @rename="   () => itemRenameDialog.showModal()"
        @delete="deleteSelected"
        @copy=""
        @back="back"
        :isAtRoot
        :fileSelectedCounter="itemSelectedSet.size"
    />
</div>
</template>

<style scoped>
.file-browser {
    display: grid;
    grid-template-columns: 1fr auto;
    min-height: 0;
    height: 100%;
    box-sizing: border-box;
    background-color: var(--default-bg-color);
    box-shadow: var(--shadow-md-1);
}

body.dark .file-browser {
    border-top: solid 1px var(--shallow-bd-color);
}

.folder-view {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: .8rem;
    padding: 1.2rem 2rem;
    color: var(--default-tx-color);
    overflow-x: hidden;
    overflow-y: auto;
}

@media screen and (max-width: 767px) {
    .folder-view {
        padding: 1rem;
    }
}
</style>

<script>
function checkFormat(name, formatList) {
    for (const format of formatList) {
        if (name.endsWith(format)) {
            return true
        }
    }
    return false
}

function fileTypeResolver(filename="") {
    if (filename.endsWith(".md") || filename.endsWith(".txt")) {
        return MarkdownType
    }
    if (checkFormat(filename, [".jpg", ".jpeg", ".png", ".svg", ".gif", ".bmp", ".tiff", ".raw"])) {
        return ImageType
    }
    if (checkFormat(filename, [".wav", ".mp3", ".aiff", ".m4a", ".flac", ".aac", ".ogg"])) {
        return AudioType
    }
    if (checkFormat(filename, [".mp4", ".avi", ".wmv", ".mov", ".mkv", ".flv", ".webm"])) {
        return VideoType
    }
    return OtherType
}

function checkItemExist(itemname, fileList) {
    for (const item of fileList) {
        if (item.name === itemname) {
            return true
        }
    }
    return false
}

function checkItemnameValid(itemname) {
    return !(itemname === undefined
        || itemname.length === 0
        || itemname.includes("/")
        || itemname.includes("\\"))
}
</script>
