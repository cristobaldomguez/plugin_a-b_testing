var ABTest = function(_this) {
	this.data = {};
	this._this = _this;
	this.selectedText = _this.get(0);
	this.css = {};
};

ABTest.prototype.wrapContent = function() {
	try {
		if (window.ActiveXObject) {
			var c = document.selection.createRange();
			return c.htmlText;
		}

		var nNd = document.createElement("span");
		nNd.className = "edited bg";
		//nNd.style.cssText = "background-color: yellow;"
		var w = window.getSelection().getRangeAt(0);
		w.surroundContents(nNd);
		return nNd.innerHTML;
	} catch (e) {
		if (window.ActiveXObject) {
			return document.selection.createRange();
		} else {
			return window.getSelection();
		}
	}
};

ABTest.prototype.create_toolbox = function(target) {
	if (typeof(target)==='undefined') { target = 'short'; }

	var ab_tb = '';

	if (target === 'extended') {
		ab_tb = '<ul class="abt-toolbox extended">';
	} else {
		ab_tb = '<ul class="abt-toolbox">';
	}

		ab_tb += '<li class="abt-te abt-b"><i class="icon-bold"></i></li>';
		ab_tb += '<li class="abt-te abt-u"><i class="icon-underline"></i></li>';
		ab_tb += '<li class="abt-te abt-i"><i class="icon-italic"></i></li>';

		ab_tb += '<li class="abt-te abt-a"><i class="icon-font"></i></li>';

		ab_tb += '<li class="abt-al abt-j"><i class="icon-align-justify"></i></li>';
		ab_tb += '<li class="abt-al abt-r"><i class="icon-align-right"></i></li>';
		ab_tb += '<li class="abt-al abt-c"><i class="icon-align-center"></i></li>';
		ab_tb += '<li class="abt-al abt-l"><i class="icon-align-left"></i></li>';

		ab_tb += '<li class="abt-li abt-it"><i class="icon-text-width"></i></li>';
		ab_tb += '<li class="abt-li abt-il"><i class="icon-text-height"></i></li>';

		ab_tb += '<li class="abt-del"><i class="icon-eraser"></i></li>';
		ab_tb += '<li class="abt-cl"><i class="icon-cancel"></i></li>';
		ab_tb += '<li class="abt-sv"><i class="icon-cloud"></i></li>';

	ab_tb += '</ul>';

	return ab_tb;
};

ABTest.prototype.changeStyle = function(i) {
	//myVar.data.b = !myVar.data.b;
	eval("myVar.data" + i + "=" + "!myVar.data" + i + ";");
	var rtrn = {};
	
	switch(i) {
	    case 'b':
	        rtrn.prop = 'font-weight';
	        rtrn.val = 'bold';
	        break;
	    case 'u':
	        rtrn.prop = 'text-decoration';
	        rtrn.val = 'underline';
	        break;
	    case 'i':
	        rtrn.prop = 'font-style';
	        rtrn.val = 'italic';
	        break;
	}

	if (eval("myVar.data" + i + ";")) {
		$('.edited').css(rtrn.prop, rtrn.val);
	} else {
		$('.edited').removeStyle(rtrn.prop);
	}

	$(this).toggleClass('selected');
};

ABTest.prototype.getCSS = function(style) {
	if (style) {
		var css = {},
		attributes = style.split(';');

		for (var i = 0; i < attributes.length; i++) {
			var entry = attributes[i].split(': ');
			if (entry !== '') {
				var k = entry.splice(0,1)[0].replace(/\s+/g, '');
				css[k] = entry.join(':');
			}
		}

		this.css = css;
		return css;

	} else {
		console.log('No css to display');
	}
};

ABTest.prototype.toolboxOptions = function(rangeObject) {
	var params = rangeObject.startContainer.parentNode.getAttribute('style'); // Almacena los estilos de css que fueron agregados a la selección
	var p = window.myVar.getCSS(params);

	for(var k in p){
		if (k === 'font-weight' && p[k] === 'bold') {
			$('.abt-b').addClass('selected');
		}

		if (k === 'text-decoration' && p[k] === 'underline') {
			$('.abt-u').addClass('selected');
		}

		if (k === 'font-style' && p[k] === 'italic') {
			$('.abt-i').addClass('selected');
		}
	}
};


ABTest.prototype.add_toolbox = function(size) {
	$('.abt-toolbox').remove();
	$('.edited').addClass('bg');
	//$(this.selectedText($(this))).append(window.myVar.create_toolbox(size));	// Crear el toolbox correspondiente
};












