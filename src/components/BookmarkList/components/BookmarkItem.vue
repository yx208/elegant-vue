<script setup>

defineProps({
    title: {
        type: String,
        required: true
    },
    short: {
        type: Boolean,
        default: false
    }
});

</script>
<template>
    <li v-once class="bookmark-item">
        <div class="bookmark-item-inner">
            <template v-if="$slots.icon">
                <slot name="icon"></slot>
            </template>
            <span class="bookmark-title" :class="{ 'bookmark-short': short }">{{ title }}</span>
        </div>
    </li>
</template>
<style scoped>

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

/* 暂时没有好方法处理 */
:deep(.bookmark-item-inner svg > path) { transition: fill .2s; }
:deep(.bookmark-item-inner:hover svg > path) {
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

.bookmark-title.bookmark-short {
    max-width: 100px;
}

</style>
