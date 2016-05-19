$('*', document.body).mouseup(function(event) {
	event.stopPropagation();
	var userSelection = window.getSelection(); 					// Variable que almacena la selección hecha por la persona
	var hasBeenClicked = userSelection.isCollapsed;  			// Para saber si se realizó un click o una selección (Boolean)
	var is_contentEditable = $(this).attr('contenteditable');	// Revisa el parent para saber si el texto ya es editable
	var rangeObject = userSelection.getRangeAt(0); 				// Retorna el string seleccionado
	var hasBeenEdited = rangeObject.startContainer.parentNode.getAttribute('class') == 'edited' ? true : false; // Si se ha seleccionado un elemento ya editado (Boolean)

	if (!window.myVar) {
		window.myVar = new ABTest($(this));
		myVar.wrapContent(); 						// Envolver la selección en un span con una clase específica
	}

	if (!is_contentEditable) {						// Si el contenido no es editable, hacerlo contenteditable y con clase editable
		$(this).makeItEditable();
	}

	if (hasBeenClicked) {

		if (hasBeenEdited) {
			var params = rangeObject.startContainer.parentNode.getAttribute('style'); // Almacena los estilos de css que fueron agregados a la selección
			myVar.getCSS(params);

			$('.abt-tb').remove();
			$('.edited').addClass('bg');
			$(myVar.selectedText).append(myVar.get_toolbox('extended'));	// Crear el toolbox correspondiente
			console.log(params);
		}

	} else if (!hasBeenClicked) {

		if (hasBeenEdited) {
			$('.abt-tb').remove();
			var params = rangeObject.startContainer.parentNode.getAttribute('style'); // Almacena los estilos de css que fueron agregados a la selección
			$(myVar.selectedText).append(myVar.get_toolbox('extended'));	// Crear el toolbox correspondiente

		} else {
			$('.abt-tb').remove();
			$('.edited').addClass('bg');
			$(myVar.selectedText).append(myVar.get_toolbox('extended'));	// Crear el toolbox correspondiente
		}
	}
});

$('body').on('click', '.abt-b', function(event) {
	myVar.changeStyle('b');
});

$('body').on('click', '.abt-u', function(event) {
	myVar.changeStyle('u');
});

$('body').on('click', '.abt-i', function(event) {
	myVar.changeStyle('i');
});



$('body').on('click', '.abt-del', function(event) {
	$('.abt-tb').remove();
	$('.edited').contents().unwrap();					// Eliminar el span que envuelve el texto
	myVar = null;
	delete myVar;
});

$('body').on('click', '.abt-cl', function(event) {
	$('.abt-tb').remove();
	$('.edited.bg').removeClass('bg');
});




/*var data = "testVariable";
var i = "2";
eval("var temp_" + data + i + "=234;");
console.log(temp_testVariable2);*/