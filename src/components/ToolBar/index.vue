<script setup>

import PictureIcon from '@/components/IconPack/Picture.vue';
import {ref} from "vue";
import {fileToBase64} from "@/utils/util.js";

const fileRef = ref();
const onSelectedFile = (event) => {
    const image = event.target.files[0];
    fileToBase64(image).then(res => {
        event.target.value = '';
        chrome.storage?.local.set({background : res});
    });
}

</script>
<template>
    <div class="tool-bar">
        <picture-icon @click.native="fileRef.click()"></picture-icon>
        <input
            @change="onSelectedFile"
            class="file-input"
            ref="fileRef"
            accept="image/png,image/jpg,image/jpeg"
            type="file"
        >
    </div>
</template>
<style scoped>

.tool-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 24px;
}

.file-input {
    display: none;
}

</style>
