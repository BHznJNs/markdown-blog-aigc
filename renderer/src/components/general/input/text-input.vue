<script setup>
const model = defineModel()

function setValue(newValue) {
    model.value = newValue
}
function clear() {
    model.value = ""
}

defineProps({
    required: { type: Boolean, default: false },
    pattern: String,
    placeholder: String,
})
defineExpose({
    value: model,
    clear,
    setValue,
})
</script>

<template>
<div class="text-input">
    <slot name="prefix"></slot>
    <input
        type="text"
        spellcheck="false"
        v-model="model"
        :placeholder
        :required
        :pattern
    >
    <slot name="suffix"></slot>
</div>
</template>

<style scoped>
.text-input {
    display: flex;
    padding: 6px 12px;
    color: var(--default-tx-color);
    background-color: var(--default-bg-color);
    border: solid 2px var(--shallow-bd-color);
    border-radius: 4px;
    transition: border .3s;

    &:focus-within {
        border-color: var(--deep-bd-color);
    }
    &:has(input:invalid) {
        border-color: var(--error-color);
    }
}

input {
    width: 100%;
    color: var(--default-tx-color);
    background-color: var(--default-bg-color);
    font-size: 1rem;
    border: none;
    outline: none;
}
</style>
