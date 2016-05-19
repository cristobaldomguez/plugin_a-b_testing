var ABTest = function(_this, selectedText) {
	this.data = {}
	this._this = _this;
	this.selectedText = _this.get(0);
	this.css = {};
}

ABTest.prototype.wrapContent = function() {
	try {
		if (window.ActiveXObject) {
			var c = document.selection.createRange();
			return c.htmlText;
		}

		var nNd = document.createElement("span");
		nNd.className = "edited bg";
		//nNd.style.cssText = "background-color: yellow;"
		var w = getSelection().getRangeAt(0);
		w.surroundContents(nNd);
		return nNd.innerHTML;
	} catch (e) {
		if (window.ActiveXObject) {
			return document.selection.createRange();
		} else {
			return getSelection();
		}
	}
}

ABTest.prototype.get_toolbox = function(target) {
	if (typeof(target)==='undefined') target = 'short';

	if (target == 'extended') {
		var ab_tb = '<ul class="abt-tb extended">';
	} else {
		var ab_tb = '<ul class="abt-tb">';
	}

	ab_tb += '<li class="abt-te abt-b"><i class="fa fa-bold"></i></li>';
	ab_tb += '<li class="abt-te abt-u"><i class="fa fa-underline"></i></li>';
	ab_tb += '<li class="abt-te abt-i"><i class="fa fa-italic"></i></li>';

	ab_tb += '<li class="abt-te abt-a"><i class="fa fa-font"></i></li>';

	ab_tb += '<li class="abt-al abt-j"><i class="fa fa-align-justify"></i></li>';
	ab_tb += '<li class="abt-al abt-r"><i class="fa fa-align-right"></i></li>';
	ab_tb += '<li class="abt-al abt-c"><i class="fa fa-align-center"></i></li>';
	ab_tb += '<li class="abt-al abt-l"><i class="fa fa-align-left"></i></li>';

	ab_tb += '<li class="abt-li abt-it"><i class="fa fa-text-width"></i></li>';
	ab_tb += '<li class="abt-li abt-il"><i class="fa fa-text-height"></i></li>';

	ab_tb += '<li class="abt-del"><i class="fa fa-eraser"></i></li>';
	ab_tb += '<li class="abt-cl"><i class="fa fa-times"></i></li>';
	ab_tb += '<li class="abt-sv"><i class="fa fa-cloud"></i></li>';

	ab_tb += '</ul>';

	return ab_tb;
}

ABTest.prototype.changeStyle = function(i) {
	//myVar.data.b = !myVar.data.b;
	eval("myVar.data" + i + "=" + "!myVar.data" + i + ";");
	rtrn = {};
	
	switch(i) {
	    case 'b':
	        rtrn['prop'] = 'font-weight';
	        rtrn['val'] = 'bold';
	        break;
	    case 'u':
	        rtrn['prop'] = 'text-decoration';
	        rtrn['val'] = 'underline';
	        break;
	    case 'i':
	        rtrn['prop'] = 'font-style';
	        rtrn['val'] = 'italic';
	        break;
	}

	if (eval("myVar.data" + i + ";")) {
		$('.edited').css(rtrn['prop'], rtrn['val']);
	} else {
		$('.edited').removeStyle(rtrn['prop']);
	}

	$(this).toggleClass('selected');
}

ABTest.prototype.getCSS = function(style) {
	if (style) {
		var css = {},
		attributes = style.split(';');

		for (var i = 0; i < attributes.length; i++) {
			var entry = attributes[i].split(': ');
			if (entry != '') {
				var k = entry.splice(0,1)[0].replace(/\s+/g, '');
				css[k] = entry.join(':');
			}
		}

		this.css = css;
		return css;

	} else {
		console.log('No css to display');
	}
}

ABTest.prototype.toolboxOptions = function(p) {
	for(var k in p){
		if (k == 'font-weight' && p[k] == 'bold') {
			$('.abt-b').addClass('selected');
		}

		if (k == 'text-decoration' && p[k] == 'underline') {
			$('.abt-u').addClass('selected');
		}

		if (k == 'font-style' && p[k] == 'italic') {
			$('.abt-i').addClass('selected');
		}
	}
}




























