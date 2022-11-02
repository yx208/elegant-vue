<script setup>

import {ref} from "vue";

const time = ref('');

let timer = null;
function startTimer() {
    time.value = getCurrentTime();
    timer = setInterval(() => {
        time.value = getCurrentTime();
    }, 1000 * 10);
}
startTimer();

function getCurrentTime() {
    const date = new Date(),
        h    = String(date.getHours()).padStart(2, '0'),
        m    = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}

document.onvisibilitychange = () => {
    if (document.visibilityState === 'hidden') {
        clearInterval(timer);
    } else if (document.visibilityState === 'visible') {
        startTimer();
    }
}

</script>
<template>
    <div class="clock">{{ time }}</div>
</template>
<style scoped>

.clock {
    text-align: center;
    user-select: none;
    color: #fff;
    text-shadow: rgba(0, 0, 0, .4) 2px 0 32px;
    font-size: 200px;
    /*font-family: Monaco, monospace, Consolas;*/
    font-family: "AllertaStencil-Regular", serif;
    line-height: 1;
}

</style>
