
export async function getBookmark() {
    if (chrome.bookmarks) {
        return (await chrome.bookmarks.getTree())[0].children[0];
    } else {
        return (await import('./bookmark.json')).default;
    }
}

export function debounce(fn) {
    let timer = null;
    return () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
            timer = null;
        }, 400);
    }
}
