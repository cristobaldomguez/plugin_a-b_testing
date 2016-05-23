/* Load CSS */
var cssId = '_abt';
if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId; link.rel = 'stylesheet'; link.type = 'text/css'; link.media = 'all';
    //link.href = 'http://rPi3.local/abt.min.css';
    link.href = 'assets/css/abt.min.css';
    head.appendChild(link);
}

window.abt_var = new Array();
window.abt_varCount = 0;
window.abt_lastVar = [0, 0];

$('*:not(html, body)').mouseup(function(event) {
	event.stopPropagation();

	var userSelection = window.getSelection();
	var hasBeenClicked = userSelection.isCollapsed;						  			// Para saber si se realizó un click o una selección (Boolean)
	var rangeObject = userSelection.getRangeAt(0); 									// Retorna el string seleccionado
	var hasBeenEdited = rangeObject.startContainer.parentNode.getAttribute('class') === 'edited' ? true : false; // Si se ha seleccionado un elemento ya editado (Boolean)
	var $isNot_ContentEditable = $(this).attr('contenteditable') ? false : true;
	var currentId = $(this).get_id(userSelection);

	if (currentId) {
		if (currentId > -1) {
			window.abt_lastVar.pop();
			window.abt_lastVar.unshift(parseInt(currentId));
		}
	} else {
		window.abt_lastVar.unshift(window.abt_varCount);
		window.abt_lastVar.pop();
		abt = new ABTest($(this), _abt.setUser);
		window.abt_var[window.abt_lastVar[0]] = (abt);
		window.abt_var[window.abt_lastVar[0]].wrapContent();
		abt_varCount++;
	}

	if ($isNot_ContentEditable) {
		$(this).makeItEditable();
	}

	if (hasBeenClicked) {
		if (hasBeenEdited) {
			window.abt_var[window.abt_lastVar[0]].add_toolbox('extended');
			$(window.abt_var[window.abt_lastVar[0]].selectedText).append(window.abt_var[window.abt_lastVar[0]].create_toolbox('extended'));
			window.abt_var[window.abt_lastVar[0]].toolboxOptions(rangeObject);
		}
	} else if (!hasBeenClicked) {
		$('.edited').removeClass('bg');
		if (hasBeenEdited) {
			window.abt_var[window.abt_lastVar[0]].add_toolbox('extended');
			$(window.abt_var[window.abt_lastVar[0]].selectedText).append(window.abt_var[window.abt_lastVar[0]].create_toolbox('extended'));
		} else {
			window.abt_var[window.abt_lastVar[0]].add_toolbox('extended');
			$(window.abt_var[window.abt_lastVar[0]].selectedText).append(window.abt_var[window.abt_lastVar[0]].create_toolbox('extended'));
		}
	}
});

$('body').on('click', '.abt-te', function(e) {
	e.preventDefault();
	e.stopPropagation();
	window.abt_var[window.abt_lastVar[0]].button_action($(this));
});

$('body').on('click', '.abt-al', function(e) {
	e.preventDefault();
	e.stopPropagation();
	window.abt_var[window.abt_lastVar[0]].button_action($(this));
});

$('body').on('click', '.abt-del', function(e) {
	e.preventDefault();
	e.stopPropagation();
	$(this).parent().parent().css('text-align', '');
	$('*[data-id=' + window.abt_lastVar[0] + ']').contents().unwrap();
	$('.abt-toolbox').remove();
	window.abt_var[window.abt_lastVar[0]] = null;
	delete window.abt_var[window.abt_lastVar[0]];
});

$('body').on('click', '.abt-cl', function(e) {
	e.preventDefault();
	e.stopPropagation();
	$('.abt-toolbox').remove();
	$('[data-id=' + window.abt_lastVar[0] + '].bg').removeClass('bg');
});

$('body').on('click', '.abt-h', function(e) {
	window.open($(this).attr('href'),$(this).attr('target'));
});

$('body').on('click', '.abt-sv', function(event) {
	event.preventDefault();
	e.stopPropagation();
	$.ajax({
		type: 'POST',
		url: 'http://rPi3.local/',
		data: myVar.data,
		success: success,
		dataType: dataType
	});
});