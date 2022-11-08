<script setup>

import FolderIcon from '@/components/IconPack/Dir.vue';
import FileIcon from '@/components/IconPack/File.vue';
import BookmarkItem from './components/BookmarkItem.vue';

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
    },
    short: {
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
        <template v-if="$slots.header">
            <slot name="header"></slot>
        </template>
        <template v-for="(item, index) in list" :key="item.id">
            <bookmark-item
                :short="short"
                :icon="item.children ? FolderIcon : FileIcon"
                :title="item.title"
                @click.native="onClickItem($event, item, index)"
            ></bookmark-item>
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

</style>
