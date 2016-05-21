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

window.gVarCount = 0;
window.gVar = new Array();														// Array para almacenar todas las variables creadas
//window.gVar[pageNumber] = "something"; 

$('*', document.body).mouseup(function(event) {
	event.stopPropagation();

	var userSelection = window.getSelection();
	var hasBeenClicked = userSelection.isCollapsed;						  			// Para saber si se realizó un click o una selección (Boolean)
	var rangeObject = userSelection.getRangeAt(0); 									// Retorna el string seleccionado
	var hasBeenEdited = rangeObject.startContainer.parentNode.getAttribute('class') === 'edited' ? true : false; // Si se ha seleccionado un elemento ya editado (Boolean)
	var $isNot_ContentEditable = $(this).attr('contenteditable') ? false : true;
	var currentId = $(this).get_id(userSelection);

	if (currentId) {
		curObj = window.gVar[currentId];
	} else {
		abt = new ABTest($(this), _abt.setUser);
		window.gVar[gVarCount] = (abt);
		curObj = window.gVar[gVarCount];
		curObj.wrapContent();
		gVarCount++;
	}

	if ($isNot_ContentEditable) {
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

$('body').on('click', '.abt-sv', function(event) {
	event.preventDefault();
	$.ajax({
		type: "POST",
		url: 'http://rPi3.local/',
		data: myVar.data,
		success: success,
		dataType: dataType
	});
});

// var div1 = document.getElementById("footer");
// var align = div1.getAttribute("data-id");

// console.log('value: ' + align);