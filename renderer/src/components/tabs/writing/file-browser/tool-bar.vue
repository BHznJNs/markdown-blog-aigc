<script setup>
import { computed } from "vue"
import ToolBtn from "../../../general/button/tool-button.vue"
import "@mdui/icons/keyboard-return--outlined.js"
import "@mdui/icons/add--outlined.js"
import "@mdui/icons/edit--outlined.js"
import "@mdui/icons/content-cut--outlined.js"
import "@mdui/icons/file-copy--outlined.js"
import "@mdui/icons/delete--outlined.js"
import "@mdui/icons/content-paste--outlined.js"
import "@mdui/icons/create-new-folder.js"

const props = defineProps({
    isAtRoot: Boolean,
    fileSelectedCounter: Number,
})

const emit = defineEmits([
    "add",
    "addFolder",
    "back",
    "copy",
    "rename",
    "delete",
])

const fileSelected = computed(() => {
    return props.fileSelectedCounter > 0
})
const singleFileSelected = computed(() => {
    return props.fileSelectedCounter === 1
})
</script>

<template>
<div class="toolbar hide-scrollbar">
    <ToolBtn @click="emit('back')" :type="'small'" :disabled="isAtRoot">
        <mdui-icon-keyboard-return--outlined/>
    </ToolBtn>

    <ToolBtn :type="'small'" @click="emit('add')">
        <mdui-icon-add--outlined/>
    </ToolBtn>
    <ToolBtn :type="'small'" @click="emit('addFolder')">
        <mdui-icon-create-new-folder/>
    </ToolBtn>
    <ToolBtn :type="'small'" @click="emit('rename')" :disabled="!singleFileSelected">
        <mdui-icon-edit--outlined/>
    </ToolBtn>

    <ToolBtn :type="'small'" :disabled="!fileSelected">
        <mdui-icon-content-cut--outlined/>
    </ToolBtn>
    <ToolBtn :type="'small'" @click="emit('copy')" :disabled="!fileSelected">
        <mdui-icon-file-copy--outlined/>
    </ToolBtn>

    <ToolBtn :type="'small'" :disabled="true">
        <!-- todo -->
        <mdui-icon-content-paste--outlined/>
    </ToolBtn>
    <ToolBtn :type="'small'" @click="emit('delete')" :disabled="!fileSelected">
        <mdui-icon-delete--outlined/>
    </ToolBtn>
</div>
</template>

<style scoped>
.toolbar {
    display: flex;
    flex-direction: column;
    gap: .6rem;
    padding: 1rem .6rem;
    border-left: solid 2px var(--shallow-bd-color);
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
