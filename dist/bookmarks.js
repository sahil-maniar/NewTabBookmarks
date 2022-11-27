chrome.runtime.sendMessage({ "type": "bookmarks"}, function (response) {
    document.write(response);
});