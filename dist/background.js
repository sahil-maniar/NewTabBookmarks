/*! For license information please see background.js.LICENSE.txt */
(()=>{var e={740:function(e){e.exports=function(){"use strict";var e=Object.prototype.toString,t=Array.isArray||function(t){return"[object Array]"===e.call(t)};function n(e){return"function"==typeof e}function r(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(e,t){return null!=e&&"object"==typeof e&&t in e}var i=RegExp.prototype.test;var s=/\S/;function a(e){return!function(e,t){return i.call(e,t)}(s,e)}var l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};var c=/\s*/,h=/\s+/,p=/\s*=/,u=/\s*\}/,d=/#|\^|\/|>|\{|&|=|!/;function f(e){this.string=e,this.tail=e,this.pos=0}function g(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function v(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}f.prototype.eos=function(){return""===this.tail},f.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},f.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},g.prototype.push=function(e){return new g(e,this)},g.prototype.lookup=function(e){var t,r,i,s=this.cache;if(s.hasOwnProperty(e))t=s[e];else{for(var a,l,c,h=this,p=!1;h;){if(e.indexOf(".")>0)for(a=h.view,l=e.split("."),c=0;null!=a&&c<l.length;)c===l.length-1&&(p=o(a,l[c])||(r=a,i=l[c],null!=r&&"object"!=typeof r&&r.hasOwnProperty&&r.hasOwnProperty(i))),a=a[l[c++]];else a=h.view[e],p=o(h.view,e);if(p){t=a;break}h=h.parent}s[e]=t}return n(t)&&(t=t.call(this.view)),t},v.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},v.prototype.parse=function(e,n){var o=this.templateCache,i=e+":"+(n||m.tags).join(":"),s=void 0!==o,l=s?o.get(i):void 0;return null==l&&(l=function(e,n){if(!e)return[];var o,i,s,l=!1,g=[],v=[],b=[],y=!1,k=!1,w="",x=0;function C(){if(y&&!k)for(;b.length;)delete v[b.pop()];else b=[];y=!1,k=!1}function T(e){if("string"==typeof e&&(e=e.split(h,2)),!t(e)||2!==e.length)throw new Error("Invalid tags: "+e);o=new RegExp(r(e[0])+"\\s*"),i=new RegExp("\\s*"+r(e[1])),s=new RegExp("\\s*"+r("}"+e[1]))}T(n||m.tags);for(var j,E,U,A,S,P,R=new f(e);!R.eos();){if(j=R.pos,U=R.scanUntil(o))for(var V=0,F=U.length;V<F;++V)a(A=U.charAt(V))?(b.push(v.length),w+=A):(k=!0,l=!0,w+=" "),v.push(["text",A,j,j+1]),j+=1,"\n"===A&&(C(),w="",x=0,l=!1);if(!R.scan(o))break;if(y=!0,E=R.scan(d)||"name",R.scan(c),"="===E?(U=R.scanUntil(p),R.scan(p),R.scanUntil(i)):"{"===E?(U=R.scanUntil(s),R.scan(u),R.scanUntil(i),E="&"):U=R.scanUntil(i),!R.scan(i))throw new Error("Unclosed tag at "+R.pos);if(S=">"==E?[E,U,j,R.pos,w,x,l]:[E,U,j,R.pos],x++,v.push(S),"#"===E||"^"===E)g.push(S);else if("/"===E){if(!(P=g.pop()))throw new Error('Unopened section "'+U+'" at '+j);if(P[1]!==U)throw new Error('Unclosed section "'+P[1]+'" at '+j)}else"name"===E||"{"===E||"&"===E?k=!0:"="===E&&T(U)}if(C(),P=g.pop())throw new Error('Unclosed section "'+P[1]+'" at '+R.pos);return function(e){for(var t,n=[],r=n,o=[],i=0,s=e.length;i<s;++i)switch((t=e[i])[0]){case"#":case"^":r.push(t),o.push(t),r=t[4]=[];break;case"/":o.pop()[5]=t[2],r=o.length>0?o[o.length-1][4]:n;break;default:r.push(t)}return n}(function(e){for(var t,n,r=[],o=0,i=e.length;o<i;++o)(t=e[o])&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}(v))}(e,n),s&&o.set(i,l)),l},v.prototype.render=function(e,t,n,r){var o=this.getConfigTags(r),i=this.parse(e,o),s=t instanceof g?t:new g(t,void 0);return this.renderTokens(i,s,n,e,r)},v.prototype.renderTokens=function(e,t,n,r,o){for(var i,s,a,l="",c=0,h=e.length;c<h;++c)a=void 0,"#"===(s=(i=e[c])[0])?a=this.renderSection(i,t,n,r,o):"^"===s?a=this.renderInverted(i,t,n,r,o):">"===s?a=this.renderPartial(i,t,n,o):"&"===s?a=this.unescapedValue(i,t):"name"===s?a=this.escapedValue(i,t,o):"text"===s&&(a=this.rawValue(i)),void 0!==a&&(l+=a);return l},v.prototype.renderSection=function(e,r,o,i,s){var a=this,l="",c=r.lookup(e[1]);if(c){if(t(c))for(var h=0,p=c.length;h<p;++h)l+=this.renderTokens(e[4],r.push(c[h]),o,i,s);else if("object"==typeof c||"string"==typeof c||"number"==typeof c)l+=this.renderTokens(e[4],r.push(c),o,i,s);else if(n(c)){if("string"!=typeof i)throw new Error("Cannot use higher-order sections without the original template");null!=(c=c.call(r.view,i.slice(e[3],e[5]),(function(e){return a.render(e,r,o,s)})))&&(l+=c)}else l+=this.renderTokens(e[4],r,o,i,s);return l}},v.prototype.renderInverted=function(e,n,r,o,i){var s=n.lookup(e[1]);if(!s||t(s)&&0===s.length)return this.renderTokens(e[4],n,r,o,i)},v.prototype.indentPartial=function(e,t,n){for(var r=t.replace(/[^ \t]/g,""),o=e.split("\n"),i=0;i<o.length;i++)o[i].length&&(i>0||!n)&&(o[i]=r+o[i]);return o.join("\n")},v.prototype.renderPartial=function(e,t,r,o){if(r){var i=this.getConfigTags(o),s=n(r)?r(e[1]):r[e[1]];if(null!=s){var a=e[6],l=e[5],c=e[4],h=s;0==l&&c&&(h=this.indentPartial(s,c,a));var p=this.parse(h,i);return this.renderTokens(p,t,r,h,o)}}},v.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(null!=n)return n},v.prototype.escapedValue=function(e,t,n){var r=this.getConfigEscape(n)||m.escape,o=t.lookup(e[1]);if(null!=o)return"number"==typeof o&&r===m.escape?String(o):r(o)},v.prototype.rawValue=function(e){return e[1]},v.prototype.getConfigTags=function(e){return t(e)?e:e&&"object"==typeof e?e.tags:void 0},v.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!t(e)?e.escape:void 0};var m={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){b.templateCache=e},get templateCache(){return b.templateCache}},b=new v;return m.clearCache=function(){return b.clearCache()},m.parse=function(e,t){return b.parse(e,t)},m.render=function(e,n,r,o){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+((t(i=e)?"array":typeof i)+'" was given as the first argument for mustache#render(template, view, partials)'));var i;return b.render(e,n,r,o)},m.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return l[e]}))},m.Scanner=f,m.Context=g,m.Writer=v,m}()},415:e=>{e.exports={getAssets:function e(t){let n=[];return t.forEach((t=>{let r={title:t.title||"",url:t.url||"",children:[]};t.children&&t.children.length>0&&(r.children=e(t.children)),n.push(r)})),n}}},911:e=>{e.exports={bookmarksTemplate:'\n    {{!--\nEach of these snippets expects {title: "...", children: [...] } to be passed.\nThe child in children, if leaf node, should have {title: "...", url: "...", children: []} to be rendered\nThe child in children, if non leaf node, should have it\'s own {title: "...", children: [...]}\nrender should be the name of the partial, that has this same template code.\n--}}\n<div class="row border p-3 m-3">\n    {{#title}}\n        <div class="col-sm-1 gy-3">\n            <div class="btn btn-primary btn-lg p-3 border disabled">{{title}}</div>\n        </div>\n    {{/title}}\n\n    {{#children}}\n        {{^children.length}}\n            <div class="col-sm-1 gy-3">\n                <a href="{{{url}}}" target="_blank" class="btn btn-default btn-lg p-3 border" role="button">{{title}}</a>\n            </div>\n        {{/children.length}}\n        {{#children.length}}\n            {{>render}}\n        {{/children.length}}\n    {{/children}}\n\n</div>\n',headerAndFooterTemplate:'\n<html lang="en">\n<head>\n    <title>\n        Bookmarks in New Tab\n    </title>\n    \x3c!-- CSS only --\x3e\n    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"\n          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">\n</head>\n<body>\n<div class="container-fluid p-3">\n    {{!-- Code of the bookmarks to be passed while rendering. Code will not be escaped --}}\n    {{>render}}\n</div>\n\x3c!-- JavaScript Bundle with Popper --\x3e\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"\n        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"\n        crossorigin="anonymous"><\/script>\n</body>\n</html>      \n'}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}(()=>{const e=n(415),t=n(911),r=n(740),o=chrome||browser;let i=[],s="";function a(){let n;o.bookmarks.getTree().then((e=>{n=e})).catch((e=>{console.log("Promise Rejected"),console.log(e)})).finally((()=>{var o;i=e.getAssets(n),i.length>0&&(o=i[0],s=o.children&&o.children.length?r.render(t.headerAndFooterTemplate,o,{render:t.bookmarksTemplate}):"")}))}o.commands.onCommand.addListener((e=>{"showBookmarks"===e&&o.tabs.create({url:"dist/bookmarks.html"})})),[o.bookmarks.onChanged,o.bookmarks.onMoved,o.bookmarks.onCreated,o.bookmarks.onRemoved,o.bookmarks.onChildrenReordered,o.bookmarks.onImportEnded].forEach((function(e){e.addListener(a)})),o.action.onClicked.addListener((function(e){o.tabs.create({url:"dist/bookmarks.html"})})),o.runtime.onMessage.addListener(((e,t,n)=>{const{type:r}=e;"bookmarks"===r&&n(s)})),a()})()})();