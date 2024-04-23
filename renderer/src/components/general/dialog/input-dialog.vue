<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import TextBtn from "../button/text-button.vue"

const dialog = ref(null)
const emit = defineEmits(["cancel", "returnValue"])
const { t } = useI18n()

function cancel() {
    emit("cancel")
    dialog.value.close()
}

function returnValue() {
    emit("returnValue")
    dialog.value.close()
}

const showModal = () => dialog.value.showModal()
defineExpose({ showModal })
</script>

<template>
<dialog ref="dialog">
    <header>
        <p><slot name="header"></slot></p>
    </header>
    <slot name="input"></slot>

    <div class="btn-group">
        <TextBtn @click="cancel">{{ t("dialog.cancel") }}</TextBtn>
        <TextBtn @click="returnValue">{{ t("dialog.confirm") }}</TextBtn>
    </div>
</dialog>
</template>

<style scoped>
dialog {
    width: 85%;
    max-width: 25rem;
    color: var(--default-tx-color);
    background-color: var(--default-bg-color);
    border: none;
    border-radius: 12px;
    outline: none;
    box-shadow: var(--shadow-lg);

    &::backdrop {
        background: rgba(0, 0, 0, 0.45);
    }
}

header p {
    margin: .4rem 0 1rem 0;
    font-size: 1.25em;
}

.btn-group {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 2rem;
}
</style>