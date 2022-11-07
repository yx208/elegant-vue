<script setup>

import {nextTick, ref, reactive} from "vue";

import {debounce, getBookmark} from "@/utils/util.js";
import BookmarkList from './BookmarkList.vue';

const emits = defineEmits(['menu']);

const visibleBookmark = reactive({ children: [], parentId: '1' });
const invisibleBookmark = reactive({ children: [], parentId: '1' });
getBookmark().then(res => {
    visibleBookmark.children = res.children;
    visibleBookmark.parentId = res.parentId;
    visibleBookmark.title = res.title;
    nextTick(() => calculateLayout());
});

/** @type { {x: number, width: number}[] } */
const elementLayout = [];
const calculateLayout = () => {
    const bookmarkContainer = document.getElementById('bookmark');
    const children = bookmarkContainer.children ?? [];
    for (let i = 0; i < children.length; i++) {
        const { offsetLeft, offsetWidth } = children[i];
        elementLayout.push({ x: offsetLeft, width: offsetWidth });
    }
    onResizeLayout();
    nextTick(() => bookmarkContainer.style.visibility = 'visible');
}

const onClickMenu = (record, index) => {
    emits('menu', record, index, elementLayout[index].x);
}

let lastWinWidth = document.body.clientWidth;
function onResizeLayout() {
    const winWidth = document.body.clientWidth;
    const isExpand = winWidth > lastWinWidth;
    isExpand ? expandBookmarks(winWidth) : decreaseBookmarks(winWidth);
    lastWinWidth = winWidth;
}

const decreaseBookmarks = (winWidth) => {
    const length = visibleBookmark.children.length - 1;
    let reduce = 0;
    for (let i = length; i >= 0; i--) {
        const element = elementLayout[i];
        // 完全显示需要的宽度，大于窗口宽度
        if ((element.x + element.width) > winWidth) {
            reduce++;
        } else {
            break;
        }
    }
    if (reduce > 0) {
        let val = visibleBookmark.children.splice(length - reduce + 1, reduce);
        invisibleBookmark.children.unshift(...val);
    }
}

const expandBookmarks = (winWidth) => {
    const visibleLength = visibleBookmark.children.length;
    let increase = 0;
    for (let i = 0; i < invisibleBookmark.children.length; i++) {
        const element = elementLayout[visibleLength + i];
        if ((element.x + element.width) <= winWidth) {
            increase++;
        } else {
            break;
        }
    }
    if (increase > 0) {
        let val = invisibleBookmark.children.splice(0, increase);
        visibleBookmark.children.push(...val);
    }
}

window.onresize = debounce(onResizeLayout);

</script>
<template>
    <bookmark-list
        id="bookmark"
        style="visibility: hidden"
        :list="visibleBookmark.children"
        @menu="onClickMenu"
    ></bookmark-list>
<!--    <div class="bookmark-dropdown">-->
<!--        <bookmark-dropdown :bookmark="invisibleBookmark"></bookmark-dropdown>-->
<!--    </div>-->
</template>
<style scoped>

.bookmark-dropdown {
    position: absolute;
    top: var(--bookmark-height);
    right: 200px;
    min-width: 200px;
    height: auto;
    overflow: hidden;
    clip-path: polygon(26px 0, 41px 15px, 100% 15px, 100% 100%, 0 100%, 0 15px, 11px 15px);
}

</style>
