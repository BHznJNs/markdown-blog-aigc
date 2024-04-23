<script setup>
defineProps({
    type: {
        type: String,
        default: "normal",
    },
    disabled: Boolean,
})
</script>

<template>
<button :class="type" :disabled>
    <div class="icon">
        <slot></slot>
    </div>
</button>
</template>

<style scoped>
button {
    all: unset;
    display: flex;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    box-sizing: border-box;
    padding: .5rem 0;
    border-radius: 8px;
    color: var(--default-tx-color);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    user-select: none;
    transition: box-shadow .3s,
                opacity .3s,
                background .3s;
}
button:hover {
    box-shadow: var(--shadow-md-1);
    background-color: var(--hovered-bg-color) !important;
}
button:disabled {
    opacity: .6;
    pointer-events: none;
}
body.dark button {
    background-color: var(--allpage-bg-color);
}

button.small {
    width: 2.8rem;
    height: 2.8rem;
    padding: .6rem 0;
}

.icon > :deep(*) {
    width: 100%;
    height: 100%;
}
</style>
