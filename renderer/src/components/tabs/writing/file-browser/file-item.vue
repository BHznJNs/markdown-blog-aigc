<script setup>
import { useI18n } from "vue-i18n"
import "@mdui/icons/insert-drive-file--outlined.js"
import "@mdui/icons/text-fields--outlined.js"
import "@mdui/icons/folder--outlined.js"
import "@mdui/icons/image--outlined.js"
import "@mdui/icons/audio-file--outlined.js"
import "@mdui/icons/video-file--outlined.js"
import { FolderType, MarkdownType, ImageType, AudioType, VideoType, OtherType } from "./fileTypes.js"

const { t } = useI18n()

const props = defineProps({
    id: Number,
    name: String,
    date: Number,
    type: {type: Symbol, default: MarkdownType},
    selected: {type: Boolean, default: false},
})

const emit = defineEmits([
    "select",
    "openFolder",
    "openArticle",
])

function select() {
    emit("select", props.id)
}

function open() {
    const { type, name } = props
    if (type === FolderType) {
        emit("openFolder", name + "/")
    } else if (type === MarkdownType) {
        emit("openArticle", name)
    } else {
        emit("openMedia", name)
    }
}
</script>

<template>
<div
    class="file-item"
    :class="{ selected }"
    @click="select"
    @dblclick="open"
>
    <div class="file-icon">
        <mdui-icon-text-fields--outlined v-if="type === MarkdownType"/>
        <mdui-icon-folder--outlined v-if="type === FolderType"/>
        <mdui-icon-image--outlined v-if="type === ImageType"/>
        <mdui-icon-audio-file--outlined v-if="type === AudioType"/>
        <mdui-icon-video-file--outlined v-if="type === VideoType"/>
        <mdui-icon-insert-drive-file--outlined v-if="type === OtherType"/>
    </div>
    <div class="file-info">
        <div class="file-name">
            {{ name }}
        </div>
        <div class="file-type">{{ t("main.writing.fileTypes." + type.description) }}</div>
        <div class="file-date">{{ new Intl.DateTimeFormat().format(date) }}</div>
    </div>
</div>
</template>

<style scoped>
.file-item {
    --item-height: 4rem;

    display: grid;
    gap: 4px;
    grid-template-columns: 4rem 1fr;
    width: 14rem;
    max-width: 46%;
    padding: 0 4px;
    height: var(--item-height);
    background-color: var(--default-bg-color);
    border-radius: 8px;
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition: background .3s;
}
.file-item.selected,
.file-item:hover {
    background-color: var(--hovered-bg-color);
}

.file-icon > * {
    font-size: var(--item-height);
}

.file-info {
    min-width: 0;
    padding-top: 2px;
    user-select: none;
}
.file-info > * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.file-name {
    font-size: 18px;
}
.file-type, .file-date {
    font-size: 14px;
    line-height: 16px;
    opacity: .8;
}
</style>
