<script setup>
import { useI18n } from "vue-i18n"
import { RouterLink } from "vue-router"
import "@mdui/icons/format-list-bulleted--outlined.js"
import "@mdui/icons/edit--outlined.js"
import "@mdui/icons/sync--outlined.js"
import "@mdui/icons/settings--outlined.js"
import TabBtn from "./general/button/tab-button.vue"

const { t } = useI18n()
</script>

<template>
<div class="side-bar">
    <div class="tabs">
        <RouterLink class="tab-item" :to="'/overview'">
            <TabBtn>
                <template #icon>
                    <mdui-icon-format-list-bulleted--outlined/>
                </template>
                {{ t("sideBar.overview") }}
            </TabBtn>
        </RouterLink>
        <RouterLink class="tab-item" :to="'/writing'">
            <TabBtn>
                <template #icon>
                    <mdui-icon-edit--outlined/>
                </template>
                {{ t("sideBar.writing") }}
            </TabBtn>
        </RouterLink>
        <RouterLink class="tab-item" :to="'/release'">
            <TabBtn>
                <template #icon>
                    <mdui-icon-sync--outlined/>
                </template>
                {{ t("sideBar.release") }}
            </TabBtn>
        </RouterLink>
    </div>
    <RouterLink class="tab-item" :to="'/setting'">
        <TabBtn>
            <template #icon>
                <mdui-icon-settings--outlined></mdui-icon-settings--outlined>
            </template>
            {{ t("sideBar.setting") }}
        </TabBtn>
    </RouterLink>
</div>
</template>

<style scoped>
.side-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-area: side;
    margin-top: 2rem;
    padding: .75rem 0 2rem;
    background-color: var(--default-bg-color);
    box-shadow: var(--shadow-md-2);
    border-top-right-radius: 12px;
    z-index: 99;
    transition: background .3s .15s;
}

.tab-item {
    text-decoration: none;
}
.tab-item::before {
    content: none;
}
</style>
