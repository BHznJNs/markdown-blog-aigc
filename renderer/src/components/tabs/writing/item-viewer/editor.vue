<script setup>
import { ref, onMounted } from "vue"
import * as monaco from "monaco-editor"
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import eventbus from "@blog/src/utils/eventbus/inst.js"
import debounce from "@blog/src/utils/debounce.js"

const editor = ref(null)
globalThis.MonacoEnvironment = {
    getWorker(_workerId, _label) {
        return new EditorWorker();
    }
}

let editorInst = null
const getEditorContent = () => editorInst.getValue()
const setEditorContent = newContent => editorInst.setValue(newContent)

const emit = defineEmits(["stopEditing"])

onMounted(() => {
    const isDark = document.body.classList.contains("dark")
    const getTheme = isDark => isDark ? "vs-dark" : "vs"

    editorInst = monaco.editor.create(editor.value, {
        language: "markdown",
        automaticLayout: true,
        fontSize: "18px",
        theme: getTheme(isDark)
    })
    editorInst.onDidChangeModelContent(debounce(() =>
        emit("stopEditing", getEditorContent()), 2000))

    eventbus.on("darkmode-toggle", isDark => {
        const themeName = getTheme(isDark)
        monaco.editor.setTheme(themeName)
    })
})

defineExpose({ getEditorContent, setEditorContent })
</script>

<template>
<div ref="editor" class="editor-container"></div>
</template>

<style scoped>
.editor-container {
    height: 100%;
}
body.dark .editor-container :deep(.monaco-editor .margin) {
    background-color: var(--default-bg-color);
}

.editor-container :deep(.overflow-guard) {
    box-shadow: var(--shadow-md-1);
    transition: box-shadow .3s;
}
.editor-container :deep(.overflow-guard):focus-within {
    box-shadow: var(--shadow-md-2);
}
</style>
