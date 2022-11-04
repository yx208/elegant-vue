<script setup>

import BookmarkList from './components/BookmarkList.vue';
import BookmarkDropdown from './components/BookmarkDropdown.vue';
import {nextTick, ref} from "vue";

const bookmarkRef = ref(null);
const submenuList = ref({ children: [] });
const submenuVisible = ref(false);
const submenuLeft = ref('0');
const onDropMenu = (record, posX) => {
    if (record.id !== submenuList.value?.id || !submenuVisible.value) {
        submenuList.value = record;
        submenuLeft.value = posX - 16 + 'px';
        nextTick(() => submenuVisible.value = true);
    }
};

document.onclick = (event) => {
    if (!bookmarkRef.value.contains(event.target)) {
        submenuVisible.value = false;
    }
}

</script>
<template>
    <section class="bookmark-container" ref="bookmarkRef">
        <bookmark-list @menu="onDropMenu"></bookmark-list>
        <div class="bookmark-dropdown" :style="{left:submenuLeft}" v-show="submenuVisible">
            <bookmark-dropdown
                column
                :list="submenuList.children"
                @menu="onDropMenu"
            ></bookmark-dropdown>
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
    top: 32px;
    left: 0;
    min-width: 200px;
    height: auto;
    overflow: hidden;
    clip-path: polygon(26px 0, 41px 15px, 100% 15px, 100% 100%, 0 100%, 0 15px, 11px 15px);
}

</style>
