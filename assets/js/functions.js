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

$.fn.get_id = function(sel) {
	var val = false, selection = '';
    for (var i = 0; i < sel.rangeCount; i++) {
        var $sNode = $(sel.getRangeAt(i).startContainer.parentNode);
        return $sNode.attr("data-id");
    }
}