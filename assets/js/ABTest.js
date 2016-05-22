var ABTest = function($this, usr) {
	this.$this = $this;
	this.selectedText = $this.get(0);
	this.data = {};
	this.data.css = {};
	this.data.setUser = usr;
};

ABTest.prototype.wrapContent = function() {
	try {
		if (window.ActiveXObject) {
			var c = document.selection.createRange();
			return c.htmlText;
		}

		var nNd = document.createElement("span");
		nNd.className = "edited bg";
		nNd.setAttribute("data-id", window.abt_varCount);
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

	var ab_tb = '', li_value = '', abt_tb_constructor = [
		['he', { classA: "h", classI: "lifebuoy" }],
		['te', { classA: "b", classI: "bold" }, { classA: "u", classI: "underline" }, { classA: "i", classI: "italic" }, { classA: "a", classI: "font" }],
		['al', { classA: "j", classI: "align-justify" }, { classA: "l", classI: "align-left" }, { classA: "c", classI: "align-center" }, { classA: "r", classI: "align-right" }],
		['li', { classA: "it", classI: "text-width" }, { classA: "il", classI: "text-height" }],
		['',   { classA: "del", classI: "trash" }, { classA: "cl", classI: "cancel" }, { classA: "sv", classI: "floppy" }],
	];
	
	if (target === 'extended') {
		ab_tb = '<ul class="abt-toolbox extended" data-id="-1">';
	} else {
		ab_tb = '<ul class="abt-toolbox">';
	}

	$.each(abt_tb_constructor, function( index, arr ) {
		$.each(arr, function(key, value) {
			if (typeof value === 'string' || value instanceof String) {
				li_value = value;
				ab_tb += value === 'li' ? '<li class="abt-' + li_value + '" data-id="-1">' : '<li data-id="-1">';

			} else {
				ab_tb += '<a href="#" class="abt-' + li_value + ' abt-' + value.classA + '" data-id="-1"><i class="icon-' + value.classI + '" data-id="-1"></i></a>';
			}

		});

		ab_tb += '</li>';
	});

	ab_tb += '</ul>';

	return ab_tb;
};

ABTest.prototype.changeStyle = function(i) {
	//this.data.b = !this.data.b;
	eval("this.data" + i + "=" + "!this.data" + i + ";");

	var rtrn = new Object();
	
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
		(rtrn.css === 'textAlign') ? $('[data-id=' + window.abt_lastVar[0] + ']').parent().css(rtrn.prop, rtrn.val) : $('[data-id=' + window.abt_lastVar[0] + ']').css(rtrn.prop, rtrn.val);

		this.data.css[rtrn.css] = rtrn.val;
	} else {
		$('[data-id=' + window.abt_lastVar[0] + ']').removeStyle(rtrn.prop);
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
	$('[data-id=' + window.abt_lastVar[0] + ']').addClass('bg');
};

ABTest.prototype.button_action = function($this) {
	var $clase = $this.attr('class').split(' ');
	var val = $clase[1].split('-');

	if (val[1] === 'j' || val[1] === 'l' || val[1] === 'c' || val[1] === 'r') {
		$('.abt-al').removeClass('selected');
	}
	
	$('.abt-' + val[1]).toggleClass('selected');
	window.abt_var[window.abt_lastVar[0]].changeStyle(val[1]);
};