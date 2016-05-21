$.fn.makeItEditable = function() {
	$(this).attr({
		contenteditable: 'true',
		class: 'editable'
	});
};

$.fn.removeStyle = function(style) {
	var search = new RegExp(style + '[^;]+;?', 'g');

	return this.each(function() {
		$(this).attr('style', function(i, style) {
			return style.replace(search, '');
		});
	});
};

$.fn.hasId = function(style) {
    var flag = 0;
    sel = this;
    for (var i = 0; i < sel.rangeCount; i++) {
        var $sNode = $(sel.getRangeAt(i).startContainer.parentNode);
        var $eNode = $(sel.getRangeAt(i).endContainer.parentNode);
        if ($sNode.prop("class") === "edited" && $eNode.prop("class") === "edited") {
            console.log('Ya fue editado');
        }
    }
}