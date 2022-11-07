<script setup>

import DirSvg from '../../../assets/dir.svg';
import FileSvg from '../../../assets/file.svg';

const emits = defineEmits(['menu']);
defineProps({
    bookmark: {
        type: Object,
        default() {
            return { children: [], parentId: '1' };
        }
    }
});

/**
 * @param {MouseEvent} event
 * @param record
 */
const onClickItem = (event, record) => {
    if (record.url) {
        window.open(record.url, (event.metaKey || event.ctrlKey) ? 'target' : '_self');
    } else {
        emits('menu', record);
    }
};

</script>
<template>
    <ul class="bookmark">
        <li class="bookmark-item" v-show="bookmark.parentId !== '1'">
            <div class="bookmark-item-inner">
                <img width="20" height="20" :src="DirSvg" alt="">
                <span class="bookmark-title">返回上一级</span>
            </div>
        </li>
        <template v-for="item in bookmark.children" :key="item.id">
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
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    height: 100%;
    list-style: none;
    padding: 31px 16px 16px 16px;
    background-color: var(--blur-bg);
    backdrop-filter: blur(var(--blur));
    background-size: 150% 150%;
    overflow: hidden;
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
