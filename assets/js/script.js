$('*', document.body).mouseup(function(event) {
	event.stopPropagation();
	var userSelection = window.getSelection();
	var hasBeenClicked = userSelection.isCollapsed;  			// Para saber si se realizó un click o una selección (Boolean)
	var rangeObject = userSelection.getRangeAt(0); 				// Retorna el string seleccionado
	var hasBeenEdited = rangeObject.startContainer.parentNode.getAttribute('class') == 'edited' ? true : false; // Si se ha seleccionado un elemento ya editado (Boolean)
	var is_contentEditable = $(this).attr('contenteditable');

	if (!window.myVar) {
		window.myVar = new ABTest($(this));
		myVar.wrapContent(); 						// Envolver la selección en un span con una clase específica
	}

	if (!is_contentEditable) {						// Si el contenido no es editable, hacerlo contenteditable y con clase editable
		$(this).makeItEditable();
	}

	if (hasBeenClicked) {

		if (hasBeenEdited) {

			$('.abt-tb').remove();
			$('.edited').addClass('bg');
			$(myVar.selectedText).append(myVar.get_toolbox('extended'));	// Crear el toolbox correspondiente
			
			var params = rangeObject.startContainer.parentNode.getAttribute('style'); // Almacena los estilos de css que fueron agregados a la selección
			p = myVar.getCSS(params);
			// console.log(p);
			// console.log(myVar);
			myVar.toolboxOptions(p);
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
	$('.abt-b').toggleClass('selected');
	myVar.changeStyle('b');
});

$('body').on('click', '.abt-u', function(event) {
	$('.abt-u').toggleClass('selected');
	myVar.changeStyle('u');
});

$('body').on('click', '.abt-i', function(event) {
	$('.abt-i').toggleClass('selected');
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