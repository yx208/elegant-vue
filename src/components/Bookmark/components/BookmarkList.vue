<script setup>

import {onMounted, ref} from "vue";

import DirSvg from '../../../assets/dir.svg';
import FileSvg from '../../../assets/file.svg';
import bookmarks from "../bookmark.json";

const emits = defineEmits(['menu']);

const list = ref(bookmarks);

/**
 * @param {MouseEvent} event
 * @param record
 */
const onClickItem = (event, record) => {

    let posX = event.currentTarget.posX;
    if (!posX) {
        posX = event.currentTarget.offsetLeft;
        event.currentTarget.posX = posX;
    }

    if (record.url) {
        window.open(record.url, (event.metaKey || event.ctrlKey) ? 'target' : '_self');
    } else {
        emits('menu', record, posX);
    }
};

const bookmarkRef = ref(null);
// 挂载后计算偏移
onMounted(() => {
    const children = bookmarkRef.value.children;
    let pre = 0;
    for (let i = 0; i < children.length - 1; i++) {
        children[i].posX = pre - children[i].offsetLeft;
        pre = children[i].posX;
    }
});

</script>
<template>
    <ul class="bookmark" ref="bookmarkRef">
        <template v-for="item in list.children" :key="item.id">
            <li class="bookmark-item" @click="onClickItem($event, item)">
                <div class="bookmark-item-inner">
                    <img width="20" height="20" :src="item.children ? DirSvg : FileSvg" alt="">
                    <span class="bookmark-title">{{ item.title }}</span>
                </div>
            </li>
        </template>
    </ul>
</template>
<style scoped>

.bookmark {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;
    list-style: none;
    padding: 0 16px;
    background-color: var(--blur-bg);
    backdrop-filter: blur(var(--blur));
    background-size: 150% 150%;
    overflow: hidden;
    /*visibility: hidden;*/
}

.bookmark-item {
    position: relative;
    display: inline-block;
    height: var(--bookmark-item);
}

.bookmark-item-inner {
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    transition: color .2s;
}

.bookmark-item-inner:hover {color: var(--primary-color); }
.bookmark-item-inner svg > path { transition: fill .2s; }
.bookmark-item-inner:hover svg > path {
    fill: var(--primary-color);
    transition: .2s;
}

.bookmark-title {
    margin-left: 4px;
    font-size: var(--bookmark-size);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
}

</style>
