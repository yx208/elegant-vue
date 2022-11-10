<script setup>

import PictureIcon from '@/components/IconPack/Picture.vue';
import CleanIcon from '@/components/IconPack/Clean.vue';

import {ref} from "vue";
import {fileToBase64} from "@/utils/util.js";

const fileRef = ref();
const onSelectedFile = (event) => {
    const image = event.target.files[0];
    fileToBase64(image).then(res => {
        event.target.value = '';
        const bg = document.getElementById('bg');
        bg.style.backgroundImage = `url(${res})`;
        chrome.storage?.local.set({background : res});
    });
}

const cleanBg = () => {
    chrome.storage?.local.remove('background');
    const bg = document.getElementById('bg');
    bg.style.backgroundImage = 'url(bg.jpg)';
}

</script>
<template>
    <div class="tool-bar">
        <picture-icon class="cursor-pointer" @click.native="fileRef.click()"></picture-icon>
        <clean-icon class="cursor-pointer" @click.native="cleanBg"></clean-icon>
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
    gap: 24px;
    padding: 24px;
}

.file-input {
    display: none;
}

</style>
