$('*', document.body).mouseup(function(event) {
	event.stopPropagation();
	var userSelection = window.getSelection();
	var hasBeenClicked = userSelection.isCollapsed;  			// Para saber si se realizó un click o una selección (Boolean)
	var rangeObject = userSelection.getRangeAt(0); 				// Retorna el string seleccionado
	var hasBeenEdited = rangeObject.startContainer.parentNode.getAttribute('class') === 'edited' ? true : false; // Si se ha seleccionado un elemento ya editado (Boolean)
	var isNot_ContentEditable = $(this).attr('contenteditable') ? false : true;

	if (!window.myVar) {
		window.myVar = new ABTest($(this), _abt.setUser);
		window.myVar.wrapContent();
	}

	if (isNot_ContentEditable) {
		$(this).makeItEditable();
	}

	if (hasBeenClicked) {
		if (hasBeenEdited) {
			window.myVar.add_toolbox('extended');
			$(window.myVar.selectedText).append(window.myVar.create_toolbox('extended'));
			window.myVar.toolboxOptions(rangeObject);
		}
	} else if (!hasBeenClicked) {
		if (hasBeenEdited) {
			window.myVar.add_toolbox('extended');
			$(window.myVar.selectedText).append(window.myVar.create_toolbox('extended'));
		} else {
			window.myVar.add_toolbox('extended');
			$(window.myVar.selectedText).append(window.myVar.create_toolbox('extended'));
		}
	}
});

$('body').on('click', '.abt-te', function(e) {
	e.preventDefault();
	var clase = $(this).attr('class').split(' ');
	var val = clase[1].split('-');
	
	$('.abt-' + val[1]).toggleClass('selected');
	window.myVar.changeStyle(val[1]);
});

$('body').on('click', '.abt-al', function(e) {
	e.preventDefault();
	var clase = $(this).attr('class').split(' ');
	var val = clase[1].split('-');

	$('.abt-al').removeClass('selected');
	$('.abt-' + val[1]).toggleClass('selected');
	window.myVar.changeStyle(val[1]);
});

$('body').on('click', '.abt-del', function(e) {
	e.preventDefault();
	$(this).parent().parent().css("text-align", "");
	$('.edited').contents().unwrap();					// Eliminar el span que envuelve el texto
	$('.abt-toolbox').remove();
	window.myVar = null;
	delete window.myVar;
});

$('body').on('click', '.abt-cl', function(e) {
	e.preventDefault();
	$('.abt-toolbox').remove();
	$('.edited.bg').removeClass('bg');
});

$('body').on('click', '.abt-h', function(e) {
	e.preventDefault();
	
});














