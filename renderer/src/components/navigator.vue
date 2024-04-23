<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import ToolBtn from "./general/button/tool-button.vue"
import logoImage from "../../assets/favicon.png"
import "@mdui/icons/minimize.js"
import "@mdui/icons/fullscreen.js"
import "@mdui/icons/fullscreen-exit.js"
import "@mdui/icons/close.js"
import "@mdui/icons/wb-sunny--outlined.js"
import "@mdui/icons/mode-night--outlined.js"

const { t } = useI18n()
const { minimize, maximize, onToggleMaximized, restore, close } = windowOperation
const isMaximized = ref(false)

onToggleMaximized(async () =>
    isMaximized.value = await windowOperation.isMaximized())

async function toggleWindow() {
    const _isMaximized = await windowOperation.isMaximized()
    if (_isMaximized) {
        restore()
    } else {
        maximize()
    }
    isMaximized.value = !_isMaximized
}
</script>

<template>
<nav>
    <div class="logo-box">
        <img id="logo" :src="logoImage" alt="Logo">
        <p>{{ t("nav.title") }}</p>
    </div>

    <div class="tools">
        <ToolBtn
            id="light-btn"
            onclick="document.body.classList.remove('dark')"
        >
            <mdui-icon-wb-sunny--outlined/>
        </ToolBtn>
        <ToolBtn
            id="dark-btn"
            onclick="document.body.classList.add('dark')"
        >
            <mdui-icon-mode-night--outlined/>
        </ToolBtn>

        <ToolBtn @click="minimize">
            <mdui-icon-minimize/>
        </ToolBtn>
        <ToolBtn v-show="!isMaximized" @click="toggleWindow">
            <mdui-icon-fullscreen/>
        </ToolBtn>
        <ToolBtn v-show="isMaximized" @click="toggleWindow">
            <mdui-icon-fullscreen-exit/>
        </ToolBtn>
        <ToolBtn @click="close">
            <mdui-icon-close/>
        </ToolBtn>
    </div>
</nav>
</template>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    grid-area: nav;
    height: 4rem;
    margin: 0;
    padding: 0 1.6rem;
    align-items: center;
    color: var(--default-tx-color);
    background-color: var(--default-bg-color);;
    box-shadow: var(--shadow-md-2);
    z-index: 100;
    -webkit-app-region: drag;
    transition: color .3s .15s,
                background .3s .15s;
}

#logo {
    padding: .5rem 0;
    box-sizing: border-box;
}

nav div.logo-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    user-select: none;
    -webkit-app-region: none;

    p {
        margin: 0;
        font-size: 1.25em;
    }
    img {
        height: 3.2rem;
        max-height: 100%;
        transition: filter .3s .15s;
    }
}

.tools {
    display: flex;
    height: 100%;
    gap: .75rem;
    padding: .6rem 0;
    -webkit-app-region: none;
    box-sizing: border-box;
}

body:not(.dark) nav #light-btn {
    display: none;
}
body.dark nav #dark-btn {
    display: none;
}
</style>
