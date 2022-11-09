<script setup>

import {computed, nextTick, reactive, ref} from "vue";
import BookmarkBar from '@/components/BookmarkBar/index.vue';
import BookmarkList, { BookmarkItem } from '@/components/BookmarkList';
import BackIcon from '@/components/IconPack/Back.vue';

const elementRef        = ref(null);
const menuStack         = reactive([{ children: [], id: null }]);
const menuStackPointer  = ref(0);
const submenuVisible    = ref(false);
const menuStyle         = ref(null);
const visibleMenu       = computed(() => menuStack[menuStackPointer.value]);

/**
 * @param record - 需要展示的 bookmark item
 * @param index - 暂时没啥用
 * @param meta - 子组件用于约定数据
 */
const onDropMenu = (record, index, meta) => {

    const currentMenu = menuStack[menuStackPointer.value];

    // 点击自身
    if (currentMenu?.id === record.id && submenuVisible.value) {
        submenuVisible.value = false;
        return;
    }

    // 第一个套方案，根据父元素判断是否需要压栈
    // if (currentMenu?.id === record.parentId) {
    //     menuStack[++menuStackPointer.value] = record;
    // } else {
    //     menuStack[0] = record;
    //     menuStackPointer.value = 0;
    // }

    // 第二套方案，根据传递进来的值判断是否压栈，如果存在 meta 那就是从 bookmark-bar 触发的，因为需要调整展示位置
    if (meta) {
        menuStack[0] = record;
        menuStackPointer.value = 0;
    } else {
        menuStack[++menuStackPointer.value] = record;
    }

    if (meta) {
        menuStyle.value = { [meta.dir]: meta.x + 'px' };
    }

    nextTick(() => submenuVisible.value = true);
};

const onBackUp = () => {
    menuStack.pop();
    menuStackPointer.value--;
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
        <div class="bg-blur bookmark-dropdown" :style="menuStyle" v-show="submenuVisible">
            <bookmark-list column :list="visibleMenu.children" @menu="onDropMenu">
                <template #header>
                    <bookmark-item
                        v-show="menuStackPointer > 0"
                        title="返回上一级"
                        @click.native="onBackUp"
                    >
                        <template #icon><back-icon></back-icon></template>
                    </bookmark-item>
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
    border-top: 2px solid var(--primary-color);
    position: absolute;
    top: calc(var(--bookmark-height) + 12px);
    min-width: 200px;
    height: auto;
    overflow: hidden;
    /*clip-path: path('M 20 17 C 7 17 4 2 0 0 V 1000 H 500 V 17 H 0 Z');*/
    /*clip-path: polygon(26px 0, 41px 15px, 100% 15px, 100% 100%, 0 100%, 0 15px, 11px 15px);*/
}

</style>
