import {reactive} from "vue";

/** @type { {x: number, width: number}[] } */
const elementLayout = [];
const visibleBookmark   = reactive({ children: [], parentId: '1' });
const invisibleBookmark = reactive({ children: [], parentId: '1' });

/**
 * 在合适的点调用这个函数获取布局信息
 */
function calculateLayout(elementId, hideClass) {
    const bookmarkContainer = document.getElementById(elementId);
    const children          = bookmarkContainer.children ?? [];
    for (let i = 0; i < children.length; i++) {
        const { offsetLeft, offsetWidth } = children[i];
        elementLayout.push({ x: offsetLeft, width: offsetWidth });
    }
    onResizeLayout();
    bookmarkContainer.classList.remove(hideClass);
}

let lastWinWidth = 9999; // 假设一个非常大的分辨率
function onResizeLayout() {
    const currWinWidth = document.body.clientWidth - 40; // 减 40px more 图标
    const isExpand = currWinWidth > lastWinWidth;
    lastWinWidth   = currWinWidth;
    isExpand ? expandBookmarks(currWinWidth) : decreaseBookmarks(currWinWidth);
}

// 处理收起书签
const decreaseBookmarks = (winWidth) => {
    const length = visibleBookmark.children.length - 1;
    let reduce = 0;
    for (let i = length; i >= 0; i--) {
        const element = elementLayout[i];
        // 完全显示需要的宽度，大于窗口宽度
        if ((element.x + element.width) > winWidth) {
            reduce++;
        } else {
            break;
        }
    }
    if (reduce > 0) {
        let val = visibleBookmark.children.splice(length - reduce + 1, reduce);
        invisibleBookmark.children.unshift(...val);
    }
}

// 处理展开书签
const expandBookmarks = (winWidth) => {
    const visibleLength = visibleBookmark.children.length;
    let increase = 0;
    for (let i = 0; i < invisibleBookmark.children.length; i++) {
        const element = elementLayout[visibleLength + i];
        if ((element.x + element.width) <= winWidth) {
            increase++;
        } else {
            break;
        }
    }
    if (increase > 0) {
        let val = invisibleBookmark.children.splice(0, increase);
        visibleBookmark.children.push(...val);
    }
}

export default function useListenBookmark() {
    return {
        elementLayout,
        visibleBookmark,
        invisibleBookmark,
        calculateLayout,
        onResizeLayout
    }
}

