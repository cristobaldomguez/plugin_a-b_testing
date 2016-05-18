var ABTest = function(_this, selectedText) {
	this._this = _this;
	this.selectedText = _this.get(0);
	//this.userSelection = window.getSelection();
}


ABTest.prototype.selectHTML = function() {
	try {
        if (window.ActiveXObject) {
            var c = document.selection.createRange();
            return c.htmlText;
        }
    
        var nNd = document.createElement("span");
        nNd.className = "edited";
        nNd.style.cssText = "background: yellow;"
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
		var ab_tb = '<ul class="abt-tb extend">';
	} else {
		var ab_tb = '<ul class="abt-tb">';
	}
	ab_tb += '<li class="abt-t abt-b"><i class="fa fa-bold"></i></li>';
	ab_tb += '<li class="abt-t abt-u"><i class="fa fa-underline"></i></li>';
	ab_tb += '<li class="abt-t abt-i"><i class="fa fa-italic"></i></li>';

	if (target == 'extended') {
		ab_tb += '<li class="abt-t abt-a"><i class="fa fa-font"></i></li>';
	}

	ab_tb += '<li class="abt-a abt-j"><i class="fa fa-align-justify"></i></li>';
	ab_tb += '<li class="abt-a abt-r"><i class="fa fa-align-right"></i></li>';
	ab_tb += '<li class="abt-a abt-c"><i class="fa fa-align-center"></i></li>';
	ab_tb += '<li class="abt-a abt-l"><i class="fa fa-align-left"></i></li>';

	if (target == 'extended') {
		ab_tb += '<li class="abt-l abt-it"><i class="fa fa-text-width"></i></li>';
		ab_tb += '<li class="abt-l abt-il"><i class="fa fa-text-height"></i></li>';
	}

	ab_tb += '<li class="abt-del"><i class="fa fa-eraser"></i></li>';
	ab_tb += '<li class="abt-cl"><i class="fa fa-times"></i></li>';
	ab_tb += '</ul>';

	return ab_tb;
}

var get_class = function(firstEl,lastEl) {
	var firstElement = $(firstEl); // First Element
	var lastElement = $(lastEl); // Last Element
	var collection = new Array(); // Collection of Elements
	collection.push(firstElement.attr('class')); // Add First Element to Collection
	$(firstEl).nextAll().each(function(){ // Traverse all siblings
		var siblingID  = $(this).attr('class'); // Get Sibling ID
		if (siblingID != $(lastElement).attr('class')) { // If Sib is not LastElement
			collection.push($(this).attr('class')); // Add Sibling to Collection
		} else { // Else, if Sib is LastElement
			collection.push(lastElement.attr('class')); // Add Last Element to Collection
			return false; // Break Loop
		}
	});         
	return collection; // Return Collection
}