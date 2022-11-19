import file from '@/assets/file.png';
import config from "@/utils/config.js";

export async function getBookmark() {
    return (await chrome.bookmarks.getTree())[0].children[0];
    // return (await import('./bookmark.json')).default;
}

export function getFaviconUrl(url) {
    return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=20`;
    // return file;
}

export function debounce(fn) {
    let timer = null;
    return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
            timer = null;
        }, 400);
    }
}

/**
 * @param {File} file
 */
export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = () => reject();
    });
}

export async function initBackground() {
    const res = await chrome.storage?.local.get('background');
    return res?.background ?? config.bgUrl;
}
