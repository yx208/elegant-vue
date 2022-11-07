<script setup>

import {nextTick, ref, shallowRef} from "vue";
import BookmarkBar from './components/BookmarkBar.vue';
import BookmarkList from './components/BookmarkList.vue';

const bookmarkRef    = shallowRef(null);
const submenuData    = shallowRef({ children: [] });
const submenuVisible = ref(false);
const submenuLeft    = ref('0');

const onDropMenu = (record, index, posX) => {
    if (record.id !== submenuData.value?.id || !submenuVisible.value) {
        submenuData.value = record;
        posX && (submenuLeft.value = posX - 16 + 'px');
        nextTick(() => submenuVisible.value = true);
    }
};

document.addEventListener('click', (event) => {
    if (!bookmarkRef.value.contains(event.target)) {
        submenuVisible.value = false;
    }
}, { capture: true, passive: true });

</script>
<template>
    <section class="bookmark-container" ref="bookmarkRef">
        <bookmark-bar @menu="onDropMenu"></bookmark-bar>
        <div class="bookmark-dropdown" :style="{left:submenuLeft}" v-show="submenuVisible">
            <bookmark-list column :list="submenuData.children" @menu="onDropMenu"></bookmark-list>
        </div>
    </section>
</template>
<style scoped>

.bookmark-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--bookmark-height);
    z-index: 9;
}

.bookmark-dropdown {
    position: absolute;
    top: var(--bookmark-height);
    left: 0;
    min-width: 200px;
    height: auto;
    overflow: hidden;
    clip-path: polygon(26px 0, 41px 15px, 100% 15px, 100% 100%, 0 100%, 0 15px, 11px 15px);
}

</style>
