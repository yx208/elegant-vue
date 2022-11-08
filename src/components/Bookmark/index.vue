<script setup>

import {computed, nextTick, reactive, ref} from "vue";
import BookmarkBar from '@/components/BookmarkBar/index.vue';
import BookmarkList, { BookmarkItem } from '@/components/BookmarkList';
import FolderIcon from '@/components/IconPack/Dir.vue';

const elementRef     = ref(null);
const menuStack      = reactive([{ children: [], id: null }]);
const menuStackPoint = ref(0);
const submenuVisible = ref(false);
const offsetLeft     = ref('0');
const visibleMenu    = computed(() => menuStack[menuStackPoint.value]);

const onDropMenu = (record, index, posX) => {

    const menu = menuStack[menuStackPoint.value];
    // 点击自身
    if (menu?.id === record.id && submenuVisible.value) {
        submenuVisible.value = false;
        return;
    }

    if (menu?.id === record.parentId) {
        menuStack[++menuStackPoint.value] = record;
    } else {
        menuStack[0] = record;
        menuStackPoint.value = 0;
    }

    posX && (offsetLeft.value = posX - 16 + 'px');
    nextTick(() => submenuVisible.value = true);
};

const onBackUp = () => {
    menuStack.pop();
    menuStackPoint.value--;
}

document.addEventListener('click', (event) => {
    if (!elementRef.value.contains(event.target)) {
        submenuVisible.value = false;
    }
}, { capture: true, passive: true });

</script>
<template>
    <section class="bookmark-container" ref="elementRef">
        <bookmark-bar @menu="onDropMenu"></bookmark-bar>
        <div class="bg-blur bookmark-dropdown" :style="{left:offsetLeft}" v-show="submenuVisible">
            <bookmark-list column :list="visibleMenu.children" @menu="onDropMenu">
                <template #header>
                    <bookmark-item
                        v-show="menuStackPoint > 0"
                        :icon="FolderIcon"
                        title="返回上一级"
                        @click.native="onBackUp"
                    ></bookmark-item>
                </template>
            </bookmark-list>
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
