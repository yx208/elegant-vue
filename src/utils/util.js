export async function getBookmark() {
    if (chrome.bookmarks) {
        return (await chrome.bookmarks.getTree())[0].children[0];
    } else {
        return {
            children: [],
            dateAdded: 1655688218499,
            dateGroupModified: 1665301585981,
            id: "1",
            index: 0,
            parentId: "0",
            title: "书签栏"
        };
        // return (await import('./bookmark.json')).default;
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
