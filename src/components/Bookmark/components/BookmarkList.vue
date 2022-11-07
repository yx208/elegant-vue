<script setup>

import DirSvg from '@/assets/dir.svg';
import FileSvg from '@/assets/file.svg';

const emits = defineEmits(['menu']);

defineProps({
    list: {
        type: Array,
        default() {
            return [];
        }
    },
    column: {
        type: Boolean,
        default: false
    }
});

/**
 * @param {MouseEvent} event
 * @param record
 * @param index
 */
const onClickItem = (event, record, index) => {
    if (record.url) {
        window.open(record.url, (event.metaKey || event.ctrlKey) ? 'target' : '_self');
    } else {
        emits('menu', record, index);
    }
};

</script>
<template>
    <ul class="bookmark" :class="{ 'bookmark-column': column }">
        <template v-for="(item, index) in list" :key="item.id">
            <li class="bookmark-item" @click="onClickItem($event, item, index)">
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
}

.bookmark-column {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    height: 100%;
    list-style: none;
    padding: 31px 16px 16px 16px;
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
