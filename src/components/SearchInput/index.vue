<script setup>

const onKeydown = (event) => {
    if (event.isComposing) return;
    if (event.key === 'Enter') {
        const content = event.target.value.trim();
        const openMode = (event.metaKey || event.ctrlKey) ? 'target' : '_self';
        if (content.length > 0) {
            event.target.value = '';
            window.open('https://www.google.com/search?q=' + content, openMode);
        } else {
            event.target.value = '';
        }
    }
};

</script>
<template>
    <div class="search-wrapper">
        <input class="search" placeholder="Search for the thing you want" @keydown="onKeydown">
    </div>
</template>
<style scoped>

.search-wrapper {
    min-width: 600px;
    max-width: 60vw;
    padding: 16px 32px;
    background-color: var(--blur-bg);
    backdrop-filter: blur(var(--blur));
    border-radius: 100px;
}

.search {
    outline: none;
    border: none;
    width: 100%;
    font-size: 32px;
    background-color: transparent;
    text-align: center;
    caret-color: var(--primary-color);
}

</style>
