const
    adapter = require("./adapter"),
    constants = require("./constant");

const
    Mustache = require('Mustache');

const
    browserVariable = chrome || browser;

/**
 *
 * @type NodeType[]
 */
let cachedAssets = [];

let cachedHtml = "";

function updateBookmarksVariable() {
    /**
     * @type BookmarkTreeNode[]
     */
    let bookmarks;
    browserVariable.bookmarks.getTree()
        .then((nodes) => {
            bookmarks = nodes
        })
        .catch((err) => {
            console.log("Promise Rejected");
            console.log(err);
        })
        .finally(() => {
            cachedAssets = adapter.getAssets(bookmarks);
            if (cachedAssets.length > 0) {
                cachedHtml = render(cachedAssets[0]);
            }
        });
}


/**
 *
 * @param {NodeType} node
 */
function render(node) {
    if (!node.children || !node.children.length) {
        return ""
    }

    return Mustache.render(
        constants.headerAndFooterTemplate,
        node,
        {
            "render": constants.bookmarksTemplate
        }
    );
}

browserVariable.commands.onCommand.addListener((command) => {
    if (command === "showBookmarks") {
        console.log(cachedHtml);
    }
});

let events = [
    browserVariable.bookmarks.onChanged,
    browserVariable.bookmarks.onMoved,
    browserVariable.bookmarks.onCreated,
    browserVariable.bookmarks.onRemoved,
    browserVariable.bookmarks.onChildrenReordered,
    browserVariable.bookmarks.onImportEnded
];

events.forEach(function (event) {
    event.addListener(updateBookmarksVariable);
});

browserVariable.action.onClicked.addListener(function (tab) {
    browserVariable.tabs.create({url: "dist/bookmarks.html"});
});

browserVariable.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type } = message;
    if (type === "bookmarks") {
        sendResponse(cachedHtml);
    }
    return;
});

(function init() {
    updateBookmarksVariable();
})();