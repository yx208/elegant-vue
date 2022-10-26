<script setup>

import bookmarks from './bookmark.json';

const list = bookmarks[0].children[0].children;

</script>
<template>
    <div class="bookmark-container">
        <ul class="bookmark">
            <li class="bookmark-item" v-for="item in list">
                <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 15C0 11.6863 2.68629 9 6 9H20.9655L27.5862 15.0116H58C61.3137 15.0116 64 17.6979 64 21.0116V50C64 53.3137 61.3137 56 58 56H6C2.68629 56 0 53.3137 0 50V15Z" fill="#666666"/>
                </svg>
                <span class="bookmark-title">{{ item.title }}</span>
            </li>
        </ul>
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
    overflow: hidden;
}

.bookmark {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;
}

.bookmark-item {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    transition: color .2s;
}

.bookmark-item:hover {color: #1461d5; }
.bookmark-item svg > path { transition: fill .2s; }
.bookmark-item:hover svg > path {
    fill: #1461d5;
    transition: .2s;
}

.bookmark-title {
    margin-left: 4px;
    font-size: 14px;
}

</style>