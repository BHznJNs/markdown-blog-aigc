<template>
<button class="btn">
    <slot></slot>
</button>
</template>

<style scoped>
.btn {
    all: unset;
    padding: .4rem 1.6rem;
    color: var(--default-tx-color);
    text-decoration: none;
    font-family: inherit;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 4px;
    user-select: none;
    transition: color .3s,
                background .3s;
}

.btn.active,
.btn:hover {
    color: var(--hovered-tx-color);
    background-color: var(--hovered-bg-color);
}

.btn:focus-visible {
    outline: solid 2px var(--deep-bd-color);
}
</style>
