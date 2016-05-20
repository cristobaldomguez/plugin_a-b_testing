var ABTest = function(_this) {
	this._this = _this;
	this.selectedText = _this.get(0);
	this.data = {};
	this.data.css = {};
};

ABTest.prototype.wrapContent = function() {
	try {
		if (window.ActiveXObject) {
			var c = document.selection.createRange();
			return c.htmlText;
		}

		var nNd = document.createElement("span");
		nNd.className = "edited bg";
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
		ab_tb += '<li class="abt-al abt-l"><i class="icon-align-left"></i></li>';
		ab_tb += '<li class="abt-al abt-c"><i class="icon-align-center"></i></li>';
		ab_tb += '<li class="abt-al abt-r"><i class="icon-align-right"></i></li>';

		ab_tb += '<li class="abt-li abt-it"><i class="icon-text-width"></i></li>';
		ab_tb += '<li class="abt-li abt-il"><i class="icon-text-height"></i></li>';

		ab_tb += '<li class="abt-del"><i class="icon-trash"></i></li>';
		ab_tb += '<li class="abt-cl"><i class="icon-cancel"></i></li>';
		ab_tb += '<li class="abt-sv"><i class="icon-floppy"></i></li>';

	ab_tb += '</ul>';

	return ab_tb;
};

ABTest.prototype.changeStyle = function(i) {
	//this.data.b = !this.data.b;
	eval("this.data" + i + "=" + "!this.data" + i + ";");

	var rtrn = {};
	
	switch(i) {
	    case 'b':
	        rtrn.prop = 'font-weight';
	        rtrn.val = 'bold';
	        rtrn.css = 'fontWeight';
	        break;
	    case 'u':
	        rtrn.prop = 'text-decoration';
	        rtrn.val = 'underline';
	        rtrn.css = 'textDecoration';
	        break;
	    case 'i':
	        rtrn.prop = 'font-style';
	        rtrn.val = 'italic';
	        rtrn.css = 'fontStyle';
	        break;
	    case 'j':
	        rtrn.prop = 'text-align';
	        rtrn.val = 'justify';
	        rtrn.css = 'textAlign';
	        break;
	    case 'r':
	        rtrn.prop = 'text-align';
	        rtrn.val = 'right';
	        rtrn.css = 'textAlign';
	        break;
	    case 'c':
	        rtrn.prop = 'text-align';
	        rtrn.val = 'center';
	        rtrn.css = 'textAlign';
	        break;
	    case 'l':
	        rtrn.prop = 'text-align';
	        rtrn.val = 'left';
	        rtrn.css = 'textAlign';
	        break;

	}

	if (eval("this.data" + i + ";")) {

		if (rtrn.css === 'textAlign') {
			$('.edited').parent().css(rtrn.prop, rtrn.val);
		} else {
			$('.edited').css(rtrn.prop, rtrn.val);
		}

		this.data.css[rtrn.css] = rtrn.val;
	} else {
		$('.edited').removeStyle(rtrn.prop);
		delete this.data.css[rtrn.css];
	}

	$(this).toggleClass('selected');
};

ABTest.prototype.toolboxOptions = function() {
	var p = this.data.css;

	for(var k in p){
		if (k === 'fontWeight' && p[k] === 'bold') {
			$('.abt-b').addClass('selected');
		}

		if (k === 'textDecoration' && p[k] === 'underline') {
			$('.abt-u').addClass('selected');
		}

		if (k === 'fontStyle' && p[k] === 'italic') {
			$('.abt-i').addClass('selected');
		}

		if (k === 'textAlign' && p[k] === 'justify') {
			$('.abt-j').addClass('selected');
		}

		if (k === 'textAlign' && p[k] === 'right') {
			$('.abt-r').addClass('selected');
		}

		if (k === 'textAlign' && p[k] === 'center') {
			$('.abt-c').addClass('selected');
		}

		if (k === 'textAlign' && p[k] === 'left') {
			$('.abt-l').addClass('selected');
		}
	}
};


ABTest.prototype.add_toolbox = function() {
	$('.abt-toolbox').remove();
	$('.edited').addClass('bg');
};