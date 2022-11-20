<script setup>

import PictureIcon from '@/components/IconPack/Picture.vue';
import CleanIcon from '@/components/IconPack/Clean.vue';
import config from "@/utils/config.js";

import {ref} from "vue";
import {fileToBase64} from "@/utils/util.js";

const fileRef = ref();
const onSelectedFile = async (event) => {
    const image = event.target.files[0];
    const encodeUrl = await fileToBase64(image);
    document.getElementById('bg').style.backgroundImage = `url(${encodeUrl})`;
    console.log(chrome.storage)
    if (chrome.storage) {
        await chrome.storage.local.set({background: encodeUrl});
        console.log("Picture saved!");
    }

    event.target.value = '';
}

const cleanBg = () => {
    document.getElementById('bg').style.backgroundImage = `url(${config.bgUrl})`;
    chrome.storage?.local.remove('background').then(() => {
        console.log('Removed and reset to default picture!');
    });
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
