<script>

import {defineComponent, ref} from "vue";

export default defineComponent({
    name: 'BookmarkList',
    emits: ['menu'],
    props: {
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
    },
    setup(props, { emit }) {

        const showSubmenu = ref(false);

        const onClickItem = (event, record) => {
            if (record.url) {
                window.open(record.url, (event.metaKey || event.ctrlKey) ? 'target' : '_self');
            } else {
                // emit('menu', record);
                showSubmenu.value = true;
            }
        }

        return {
            onClickItem,
            showSubmenu
        }
    }
});

</script>
<template>
    <ul class="bookmark" :class="{ 'bookmark-col': column }">
        <li class="bookmark-item" v-for="item in list" :key="item.id" @click="onClickItem($event, item)">
            <div class="bookmark-item-inner">
                <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 15C0 11.6863 2.68629 9 6 9H20.9655L27.5862 15.0116H58C61.3137 15.0116 64 17.6979 64 21.0116V50C64 53.3137 61.3137 56 58 56H6C2.68629 56 0 53.3137 0 50V15Z" fill="#666666"/>
                </svg>
                <span class="bookmark-title">{{ item.title }}</span>
            </div>
            <template v-if="item.children">
                <div class="bookmark-submenu" v-if="showSubmenu">
                    <bookmark-list column :list="item.children"></bookmark-list>
                </div>
            </template>
        </li>
    </ul>
</template>
<style scoped>

.bookmark {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;
    list-style: none;
}

.bookmark-col {
    flex-direction: column;
}

.bookmark-item {
    position: relative;
    display: inline-block;
    height: 24px;
}

.bookmark-item-inner {
    height: 100%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    transition: color .2s;
}

.bookmark-item-inner:hover {color: #1461d5; }
.bookmark-item-inner svg > path { transition: fill .2s; }
.bookmark-item-inner:hover svg > path {
    fill: #1461d5;
    transition: .2s;
}

.bookmark-title {
    margin-left: 4px;
    font-size: 14px;
}

.bookmark-submenu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    min-height: 200px;
    background: var(--blur-bg);
    backdrop-filter: var(--blur);
    z-index: 9;
}

</style>
