<script setup>

import BookmarkList from './components/BookmarkList.vue';
import bookmarks from './bookmark.json';

const list = bookmarks.children;

const onDropMenu = (record) => {
    console.log(record);
}

</script>
<template>
    <div class="bookmark-container">
        <bookmark-list :list="list" @menu="onDropMenu"></bookmark-list>
    </div>
</template>
<style scoped>

.bookmark-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--blur-bg);
    backdrop-filter: blur(var(--blur));
    height: 32px;
    padding: 0 16px;
    z-index: 9;
}

.bookmark-dropdown {
    position: absolute;
    top: 32px;
    left: 0;
    width: 200px;
    height: 200px;
    background: #000;
}

</style>
