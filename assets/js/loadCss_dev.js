/* Load CSS */
var cssId = '_abt';
if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId; link.rel = 'stylesheet'; link.type = 'text/css'; link.media = 'all';
    link.href = 'assets/css/abt.min.css';
    head.appendChild(link);
}