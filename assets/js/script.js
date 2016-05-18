$('*', document.body).mouseup(function(event) {
	event.stopPropagation();
	var userSelection = window.getSelection(); 					// Variable que almacena la selección hecha por la persona
	var is_click = userSelection.isCollapsed;  					// Para saber si se realizó un click o una selección (Boolean)
	var is_contentEditable = $(this).attr('contenteditable');	// Revisa el parent para saber si el texto ya es editable
	var rangeObject = userSelection.getRangeAt(0); 				// Retorna el string seleccionado
	var hasBeenEdited = rangeObject.startContainer.parentNode.getAttribute('class') == 'edited' ? true : false; // Retorna si se la seleccionado un elemento anteriormente editado (Boolean)

	if (is_click && !is_contentEditable) { 			// Determinar si se hizo un click en un campo no editable
		//console.log('Se hizo un click en un campo no editable');

		if (!$(this).attr('contenteditable')) {		// Si el contenido no es editable, hacerlo contenteditable y con clase editable
			$(this).attr({
				contenteditable: 'true',
				class: 'editable'
			});
		}

	} else if (is_click && is_contentEditable) { 	// Determinar si se hizo un click en un campo editable
		//console.log('Se hizo un click en un campo editable');

		if (hasBeenEdited) { // Se revisa si se hizo la selección en algún elemento anteriormente editado
			var params = rangeObject.startContainer.parentNode.getAttribute('style'); // Almacena los estilos de css que fueron agregados a la selección
			console.log('Style: ' + params);

			$('.abt-tb').remove();		 									// Si anteriormente se había abierto un wrapper, se cierra antes de crear el siguiente
			$(myTest.selectedText).append(myTest.get_toolbox('extended'));	// Crear el toolbox correspondiente
		}

	} else if (!is_click && is_contentEditable) { 	// Si se hizo una selección en un campo de texto editable
		//console.log('Se hizo una selección en un campo editable');
		
		$('.abt-tb').remove(); // Si anteriormente se había abierto un wrapper, se cierra antes de crear el siguiente

		if (hasBeenEdited) { // Se revisa si se hizo la selección en algún elemento anteriormente editado
			var params = rangeObject.startContainer.parentNode.getAttribute('style'); // Almacena los estilos de css que fueron agregados a la selección
			console.log(params);
		} else {
			var myTest = new ABTest($(this)); // Instanciar nuevo objeto con el contenido seleccionado
			myTest.selectHTML(); // Envolver la selección en un span con una clase específica
		}

	} else if (!is_click && !is_contentEditable) { 	// Si se hizo una selección en un campo de texto no editable
		//console.log('Se hizo una selección en un campo no editable');

		
		if (!$(this).attr('contenteditable')) { // Si el contenido no es editable, hacerlo contenteditable y con clase editable
			$(this).attr({
				contenteditable: 'true',
				class: 'editable'
			});
		}

		var myTest = new ABTest($(this)); 		// Instanciar nuevo objeto con el contenido seleccionado
		myTest.selectHTML(); 					// Envolver la selección en un span con una clase específica

		$('.abt-tb').remove();		 									// Si anteriormente se había abierto un wrapper, se cierra antes de crear el siguiente
		$(myTest.selectedText).append(myTest.get_toolbox('extended'));	// Crear el toolbox correspondiente
	}
});


$('body').on('click', '.abt-cl', function(event) {
	$('.abt-tb').remove(); 
});

$('body').on('click', 'abt-b', function(event) {
	
});