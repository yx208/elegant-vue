<script setup>

import {nextTick, ref, watch} from "vue";

import {debounce, getBookmark} from "@/utils/util.js";
import BookmarkList from '@/components/BookmarkList';
import MoreIcon from '@/components/IconPack/More.vue';
import useListenBookmark from "./useListenBookmark.js";

const emits = defineEmits(['menu']);

const {
    visibleBookmark,
    invisibleBookmark,
    elementLayout,
    calculateLayout,
    onResizeLayout
} = useListenBookmark();

getBookmark().then(res => {
    visibleBookmark.children = res.children;
    visibleBookmark.parentId = res.parentId;
    visibleBookmark.title    = res.title;
    nextTick(() => calculateLayout('bookmark', 'hidden-bookmark'));
});

const onClickMenu = (record, index) => {
    emits('menu', record, null, { dir: 'left', x: elementLayout[index].x });
};

const onClickMore = () => {
    emits('menu', invisibleBookmark, null, { dir: 'right', x: 12 });
}

const showMoreDot = ref(false);
watch(invisibleBookmark.children, (invisibleList) => {
    showMoreDot.value = invisibleList.length > 0;
}, { immediate: true });

window.onresize = debounce(onResizeLayout);

</script>
<template>
    <div class="bg-blur bookmark-bar">
        <bookmark-list
            short
            id="bookmark"
            class="hidden-bookmark"
            :list="visibleBookmark.children"
            @menu="onClickMenu"
        ></bookmark-list>
        <span class="bookmark-more" v-show="showMoreDot">
            <span class="more-icon" @click="onClickMore">
                <more-icon></more-icon>
            </span>
        </span>
    </div>
</template>
<style scoped>

.bookmark-bar {
    display: flex;
    justify-content: space-between;
    height: 100%;
}

.bookmark-more {
    flex-shrink: 1;
    display: inline-flex;
    align-items: center;
    justify-content: end;
}

.bookmark-more > .more-icon {
    cursor: pointer;
    height: 20px;
    width: 40px;
    text-align: center;
}

.bookmark-more > .more-icon:hover > :deep(svg > circle) {
    fill: var(--primary-color);
}

.hidden-bookmark {
    visibility: hidden;
}

.bookmark-dropdown {
    position: absolute;
    top: calc(var(--bookmark-height) + 12px);
    right: 12px;
    min-width: 200px;
    height: auto;
    overflow: hidden;
    border-top: 2px solid var(--primary-color);
    /*clip-path: polygon(91% 0, 86% 15px, 100% 15px, 100% 100%, 0 100%, 0 15px, 96% 15px);*/
}

</style>
