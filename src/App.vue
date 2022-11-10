<script setup>

import Clock from './components/Clock/index.vue';
import SearchInput from './components/SearchInput/index.vue';
import Bookmark from './components/Bookmark/index.vue';
import ToolBar from './components/ToolBar/index.vue';
import {initBackground} from "@/utils/util.js";

initBackground().then(res => {
    const bg = document.getElementById('bg');
    bg.style.cssText = `background-image:url(${res});opacity:1;`;
});

</script>

<template>
    <div class="app-background" id="bg"></div>
    <bookmark></bookmark>
    <clock style="margin-bottom:48px"></clock>
    <search-input></search-input>
    <tool-bar></tool-bar>
</template>
<style>

.app-background {
    position: absolute;
    background: no-repeat center center/cover;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    opacity: 0;
    transition: opacity .2s;
}

</style>
