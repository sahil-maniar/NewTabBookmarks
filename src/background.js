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
    console.log(cachedAssets);
    console.log(render(cachedAssets[0]));
});

(function init() {
    updateBookmarksVariable();
})();