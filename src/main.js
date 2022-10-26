import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.css';

createApp(App).mount('#app')

window.addEventListener('DOMContentLoaded', () => {
    console.log('首屏加载时间', window.performance.timing.domContentLoadedEventStart - window.performance.timing.navigationStart);
});
