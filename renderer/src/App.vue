<script setup>
import { onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { RouterView } from "vue-router"
import mountedEvent from "./scripts/darkmodeSwitcher.js"
import Navigator from "./components/navigator.vue"
import SideBar from "./components/side-bar.vue"

const { locale } = useI18n()
locale.value = "cn"
onMounted(mountedEvent)
</script>

<template>
<Navigator/>
<SideBar/>
<RouterView v-slot="{ Component }">
    <KeepAlive>
        <component :is="Component"/>
    </KeepAlive>
</RouterView>
</template>

<style scoped>
</style>
