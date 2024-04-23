<script setup></script>

<template>
<div class="tab-view">
    <slot></slot>
</div>
</template>

<style scoped>
.tab-view {
    grid-area: main;
    width: 100%;
    height: 100%;
    padding: 2rem;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
}
</style>