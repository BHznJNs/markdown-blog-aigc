<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import articleRenderer from "@blog/src/scripts/articleRenderer.js"

const { t } = useI18n()
const article = ref(null)

function render(mdContent) {
    articleRenderer(article.value, mdContent)
}

defineExpose({ render })
</script>

<template>
<div>
    <article ref="article"></article>
    <p class="empty-content">
        {{ t("main.writing.emptyPreview") }}
    </p>
</div>
</template>

<style scoped>
div {
    position: relative;
    height: 100%;
}
article {
    height: 100%;
    margin: 0;
    padding-top: 0;
    border-radius: 0;
    overflow-y: auto;
    box-shadow: var(--shadow-md-1);
}

body.dark article {
    border-top: solid 1px var(--shallow-bd-color);
}

p.empty-content {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    color: var(--default-tx-color);
    display: none;
    text-align: center;
    opacity: .75;
}
article:empty + p.empty-content {
    display: block;
}
</style>
