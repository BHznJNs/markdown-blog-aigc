<script setup>
const props = defineProps({
    imageSrc: String,
    data: String,
    description: String,
})
</script>

<template>
<div class="data-card">
    <img :src="imageSrc">
    <h1>{{ data }}</h1>
    <p>{{ description }}</p>
</div>
</template>

<style scoped>
.data-card {
    padding: 1rem 0;
    border-radius: 12px;
    background-color: var(--default-bg-color);
    box-shadow: var(--shadow-sm);
    transition: background .3s,
                box-shadow .3s;
}
.data-card:hover {
    box-shadow: var(--shadow-md-1);
}
body.dark .data-card:hover {
    background-color: var(--hovered-bg-color);
}

img {
    display: block;
    width: 100%;
    max-width: 5rem;
    margin: 0 auto;
    transition: filter .3s .15s;
}
body.dark img {
    filter: invert(1);
}

h1, p {
    margin-top: 0;
    margin-bottom: .5rem;
    color: var(--default-tx-color);
    text-align: center;
    transition: color .3s .15s;
}

p {
    opacity: .75;
}
</style>
