const bookmarksTemplate = `
    {{!--
Each of these snippets expects {title: "...", children: [...] } to be passed.
The child in children, if leaf node, should have {title: "...", url: "...", children: []} to be rendered
The child in children, if non leaf node, should have it's own {title: "...", children: [...]}
render should be the name of the partial, that has this same template code.
--}}
<div class="row border p-3 m-3">
    {{#title}}
        <div class="col-sm-1 gy-3">
            <div class="btn btn-primary btn-lg p-3 border disabled">{{title}}</div>
        </div>
    {{/title}}

    {{#children}}
        {{^children.length}}
            <div class="col-sm-1 gy-3">
                <a href="{{{url}}}" target="_blank" class="btn btn-default btn-lg p-3 border" role="button">{{title}}</a>
            </div>
        {{/children.length}}
        {{#children.length}}
            {{>render}}
        {{/children.length}}
    {{/children}}

</div>
`;

const headerAndFooterTemplate = `
<html lang="en">
<head>
    <title>
        Bookmarks in New Tab
    </title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<body>
<div class="container-fluid p-3">
    {{!-- Code of the bookmarks to be passed while rendering. Code will not be escaped --}}
    {{>render}}
</div>
<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous"></script>
</body>
</html>      
`;

module.exports = {
    bookmarksTemplate,
    headerAndFooterTemplate
};
