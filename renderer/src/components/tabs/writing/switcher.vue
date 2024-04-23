<script setup>
import { ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import TabBtn from "../../general/button/tab-button.vue"
import "@mdui/icons/edit--outlined.js"
import "@mdui/icons/play-circle--outlined.js"
import "@mdui/icons/folder--outlined.js"
import throttle from "@blog/src/utils/throttle.js"

const { t } = useI18n()
const emit = defineEmits([
    "switchTab",
    "closeTab",
])
const dynamicTabBar = ref(null)

defineProps({
    tabStates: Map,
    dynTabStates: Array,
})

onMounted(() => {
    const targetEl = dynamicTabBar.value
    targetEl.addEventListener("wheel", throttle(e => {
        const { deltaX, deltaY } = e
        const left = deltaY || deltaX / 2
        targetEl.scrollLeft += left / 2
    }, 33.3))
})
</script>

<template>
<div class="switcher">
    <div ref="dynamicTabBar" class="dynamic-tabs hide-scrollbar">
        <TabBtn
            v-for="[id, { name, active, edited }] of dynTabStates"
            :type="'small'"
            :withCloseBtn="true"
            :class="{ active, edited }"
            @click="emit('switchTab', id)"
            @close="emit('closeTab', id)"
        >
            <template #icon>
                <mdui-icon-edit--outlined/>
            </template>
            {{ name }}
        </TabBtn>
    </div>
    

    <TabBtn
        @click="emit('switchTab', 'preview')"
        :class="{ active: tabStates.get('preview').active }"
        :type="'small'"
    >
        <template #icon>
            <mdui-icon-play-circle--outlined/>
        </template>
        {{ t("main.writing.preview") }}
    </TabBtn>
    <TabBtn
        @click="emit('switchTab', 'files')"
        :class="{ active: tabStates.get('files').active }"
        :type="'small'"
    >
        <template #icon>
            <mdui-icon-folder--outlined/>
        </template>
        {{ t("main.writing.files") }}
    </TabBtn>
</div>
</template>

<style scoped>
.switcher {
    display: grid;
    grid-template-columns: 1fr auto auto;
    background-color: var(--default-bg-color);
    border-top-left-radius: 12px;
    box-shadow: var(--shadow-sm);
}

.switch-item::before {
    content: unset;
}
.switch-item.edited :deep(.btn > .text::before) {
    content: "*";
}

.dynamic-tabs {
    display: flex;
    border-right: solid 1px var(--shallow-bd-color);
    overflow-x: auto;
    overflow-y: hidden;
    border-top-left-radius: 12px;
}
</style>
