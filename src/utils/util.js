import file from '@/assets/file.png';

export async function getBookmark() {
    // return (await chrome.bookmarks.getTree())[0].children[0];
    return (await import('./bookmark.json')).default;
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

export function getFaviconUrl(url) {
    // return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=20`;
    return file;
}
