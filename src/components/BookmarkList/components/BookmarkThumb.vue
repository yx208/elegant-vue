<script setup>

defineProps({
    url: {
        type: String,
        required: true
    }
});

</script>
<template>
    <img v-once class="bookmark-thumb" :src="url" alt="thumb">
</template>
<style scoped>

.bookmark-thumb {
    width: 20px;
    height: 20px;
    vertical-align: middle;
}

</style>
