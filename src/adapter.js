/**
 * getAssets is an adapter between browser's BookmarkTreeNode[] type and NodeType[] type required by the template.
 * @param {BookmarkTreeNode[]} nodes
 * @return {NodeType[]}
 */
function getAssets(nodes) {
    /**
     *
     * @type NodeType[]
     */
    let assets = [];
    nodes.forEach((node) => {
        let obj = {
            title: node.title || "",
            url: node.url || "",
            children: []
        };

        if (node.children && node.children.length > 0) {
            obj.children = getAssets(node.children);
        }

        assets.push(obj);
    });
    return assets;
}

module.exports = {
    getAssets,
};