/* Load CSS */
var cssId = '_abt';
if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId; link.rel = 'stylesheet'; link.type = 'text/css'; link.media = 'all';
    link.href = 'http://rPi3.local/abt.min.css';
    //link.href = 'assets/css/abt.min.css';
    head.appendChild(link);
}

$('*', document.body).mouseup(function(event) {
	event.stopPropagation();
	var userSelection = window.getSelection();
	var hasBeenClicked = userSelection.isCollapsed;  			// Para saber si se realizó un click o una selección (Boolean)
	var rangeObject = userSelection.getRangeAt(0); 				// Retorna el string seleccionado
	var hasBeenEdited = rangeObject.startContainer.parentNode.getAttribute('class') === 'edited' ? true : false; // Si se ha seleccionado un elemento ya editado (Boolean)
	var isNot_ContentEditable = $(this).attr('contenteditable') ? false : true;

	if (!window.myVar) {
		window.myVar = new ABTest($(this), _abt.setUser);
		curObj = window.myVar;
		curObj.wrapContent();
	}

	if (isNot_ContentEditable) {
		$(this).makeItEditable();
	}

	if (hasBeenClicked) {
		if (hasBeenEdited) {
			curObj.add_toolbox('extended');
			$(curObj.selectedText).append(curObj.create_toolbox('extended'));
			curObj.toolboxOptions(rangeObject);
		}
	} else if (!hasBeenClicked) {
		if (hasBeenEdited) {
			curObj.add_toolbox('extended');
			$(curObj.selectedText).append(curObj.create_toolbox('extended'));
		} else {
			curObj.add_toolbox('extended');
			$(curObj.selectedText).append(curObj.create_toolbox('extended'));
		}
	}
});

$('body').on('click', '.abt-te', function(e) {
	e.preventDefault();
	curObj.button_action($(this));
});

$('body').on('click', '.abt-al', function(e) {
	e.preventDefault();
	curObj.button_action($(this));
});

$('body').on('click', '.abt-del', function(e) {
	e.preventDefault();
	$(this).parent().parent().css("text-align", "");
	$('.edited').contents().unwrap();					// Eliminar el span que envuelve el texto
	$('.abt-toolbox').remove();
	curObj = null;
	delete curObj;
});

$('body').on('click', '.abt-cl', function(e) {
	e.preventDefault();
	$('.abt-toolbox').remove();
	$('.edited.bg').removeClass('bg');
});

$('body').on('click', '.abt-h', function(e) {
	e.preventDefault();
	
});