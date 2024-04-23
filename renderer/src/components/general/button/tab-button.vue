<script setup>
import "@mdui/icons/close.js"

defineProps({
    withCloseBtn: { type: Boolean, default: false },
    type: { type: String, default: "normal" },
})
const emit = defineEmits(["close"])
</script>

<template>
<button class="btn" :class="type">
    <span class="icon">
        <slot name="icon"></slot>
    </span>
    <span class="text">
        <slot></slot>
    </span>
    <mdui-icon-close
        v-show="withCloseBtn"
        class="close"
        @click.stop="emit('close')"
    />
</button>
</template>

<style scoped>
.btn {
    all: unset;
    display: flex;
    align-items: center;
    gap: .4rem;
    height: 3rem;
    padding: .2rem 1.6rem .2rem 1.2rem;
    color: var(--default-tx-color);
    text-decoration: none;
    font-family: inherit;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
    transition: color .3s,
                background .3s;
}
.btn.active,
.btn:hover {
    color: var(--hovered-tx-color);
    background-color: var(--hovered-bg-color);
}
.btn::before {
    content: none;
}
.btn.small {
    gap: 0;
    height: 2rem;
    padding: .125rem 1rem .25rem;
}

.btn span.text {
    padding-bottom: 2px;
    font-size: 18px;
    text-wrap: nowrap;
}
.btn span.icon {
    height: 100%;
    aspect-ratio: 1 / 1;
}
.btn span.icon > :deep(*) {
    width: 100%;
    height: 100%;
    padding: .5rem 0;
    box-sizing: border-box;
}
.btn.small span.icon > :deep(*) {
    padding: 3px 0;
}
.btn.small span.text {
    font-size: 15px;
}

.btn .close {
    font-size: 1.125em;
    margin: 2px -.6rem 0 6px;
    padding: 2px;
    border-radius: 4px;
    opacity: 0;
    transition: opacity .3s,
                background .3s;
}
.btn:hover .close {
    opacity: .75;
}
.close:hover {
    background-color: var(--shallow-bd-color);
}
</style>
