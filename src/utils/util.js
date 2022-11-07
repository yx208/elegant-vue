
export async function getBookmark() {
    if (chrome.bookmarks) {
        return chrome.bookmarks.getTree();
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
