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
    color: #f6f6f6;
    text-shadow: rgba(0, 0, 0, .4) 2px 0 32px;
    font-size: 180px;
    letter-spacing: 16px;
    line-height: 1;
    font-family: Monaco, monospace, Consolas;
}

</style>
