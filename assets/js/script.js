$('*', document.body).mouseup(function(event) {
	event.stopPropagation();
	var userSelection = window.getSelection();
	var hasBeenClicked = userSelection.isCollapsed;  			// Para saber si se realizó un click o una selección (Boolean)
	var rangeObject = userSelection.getRangeAt(0); 				// Retorna el string seleccionado
	var hasBeenEdited = rangeObject.startContainer.parentNode.getAttribute('class') === 'edited' ? true : false; // Si se ha seleccionado un elemento ya editado (Boolean)
	var is_contentEditable = $(this).attr('contenteditable');

	if (!window.myVar) {
		window.myVar = new ABTest($(this));
		window.myVar.wrapContent(); 						// Envolver la selección en un span con una clase específica
	}

	if (!is_contentEditable) {						// Si el contenido no es editable, hacerlo contenteditable y con clase editable
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

$('body').on('click', '.abt-b', function() {
	$('.abt-b').toggleClass('selected');
	window.myVar.changeStyle('b');
});

$('body').on('click', '.abt-u', function() {
	$('.abt-u').toggleClass('selected');
	window.myVar.changeStyle('u');
});

$('body').on('click', '.abt-i', function() {
	$('.abt-i').toggleClass('selected');
	window.myVar.changeStyle('i');
});

$('body').on('click', '.abt-del', function() {
	$('.abt-toolbox').remove();
	$('.edited').contents().unwrap();					// Eliminar el span que envuelve el texto
	window.myVar = null;
	delete window.myVar;
});

$('body').on('click', '.abt-cl', function() {
	$('.abt-toolbox').remove();
	$('.edited.bg').removeClass('bg');
});