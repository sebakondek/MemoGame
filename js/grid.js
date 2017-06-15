function grid(qty){
	var height = 150;
	var width = 150;
	var margin = 10;
	
	if(qty == 2)
		var rows = 2;
	else
		var rows = (Math.floor(qty / 2)) + (qty % 2);
	
	var loop = 0;
	
	if(qty / 4 < 1)
		cant = qty % 4;
	else
		cant = 4;
	
	var wrapper = $("#wrapper");
	wrapper.css("width", (width * cant) + (margin * cant) + "px");
	wrapper.css("height", (height * rows) + (margin * rows) + "px");
	wrapper.css("display", "block");
	
	var restantes = qty * 2;
	
	var squareID = 0;
	
	for (var i = 0; i < rows; i++) {
		var $row = $("<div></div>", {
			class: 'row',
			id: 'row' + i
		});
		
		for(var j = 0; j < cant && restantes > 0; j++){
			var $square = $('<div id="square' + squareID + '" class="square flip-container">' +
				'<div class="front"></div>' +
				'<div class="back"></div>' +
				'</div>');
				
				$row.append($square.clone());
				restantes--;
				squareID++;
			}
			
		$("#wrapper").append($row.clone());
	}
}