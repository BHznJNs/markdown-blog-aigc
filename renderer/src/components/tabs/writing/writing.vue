<script setup>
import { computed, ref, nextTick } from "vue"
import TabView from "../tab-view.vue"
import * as dynTabManager from "./dynamicTabManager.js"
import { MarkdownType } from "./file-browser/fileTypes.js"
import Editor from "./item-viewer/editor.vue"
import Switcher from "./switcher.vue"
import Preview from "./preview.vue"
import FileBrowser from "./file-browser/file-browser.vue"

const editorViews = ref([])
const previewTab = ref(null)
const dynamicTabStates = computed(() => {
    const resultStates = []
    let counter = 0
    for (const item of dynTabManager.tabMap) {
        if (counter >= 2) {
            resultStates.push(item)
        }
        counter += 1
    }
    return resultStates
})

async function openArticle({ path, name }) {
    const tabIndex = dynTabManager.newTab(path, name, MarkdownType)
    if (tabIndex === null) return

    await nextTick()
    const mdContent = await fileOperation.readFile(path)
    const targetEditor = editorViews.value[tabIndex]
    targetEditor.setEditorContent(mdContent)
}

function renameArticle(oldPath, newPath, newName) {
    dynTabManager.renameTab(oldPath, newPath, newName)
}
</script>

<template>
<TabView class="writing-tab">
    <Switcher
        @switchTab="dynTabManager.switchTab"
        @closeTab="dynTabManager.closeTab"
        :tabStates="dynTabManager.tabMap"
        :dynTabStates="dynamicTabStates"
    />
    <div class="tab-views">
        <Editor
            v-for="[_, { active }] of dynamicTabStates"
            v-show="active"
            ref="editorViews"
            @stopEditing="previewTab.render"
        />
        <Preview
            v-show="dynTabManager.tabMap.get('preview').active"
            ref="previewTab"
        />
        <FileBrowser
            v-show="dynTabManager.tabMap.get('files').active"
            @openArticle="openArticle"
            @renameArticle="renameArticle"
        />
    </div>
</TabView>
</template>

<style scoped>
.writing-tab {
    display: grid;
    grid-template-rows: auto 1fr;
    padding-right: 0;
    padding-bottom: 0;
}

.tab-views {
    min-height: 0;
}
</style>
