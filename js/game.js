$(document).ready(function(){
	(function(){
		var flipped;
		var elems;
		var cards;
		var points;

		$("#start").on("click",function(){
				start();
			})

		function start(){
			$("#wrapper").empty();
			$("#autoplay").show();
			
			points = 0;
			flipped = 0;
			elems = [];
			cards = [];	
			
			do{
				var pairs = Math.floor(prompt("Con cuantos pares de cartas queres jugar? (2-10)"));
			}while((pairs < 2 || pairs > 10))
			
			$("#start").text("RESTART");
			
			grid(pairs);
			assignValues(pairs);
			
			$("#autoplay").on("click", function(){
				autoplay(pairs, cards);
			})
			
			$(".square").on("click",function(){
				flip($(this).attr("id"));
			})
		}


		function assignValues(pairs){
			var numbers=[];
			
			for(var i = 0; i < 2; i++){
				for(var j = 0; j < pairs; j++){
					numbers.push(j);
				}
			}
			
			var length = numbers.length;
			
			for(var i = 0; i < length; i++){
				var pos = Math.floor(Math.random() * numbers.length);
				cards.push({square: "square" + i, value: numbers[pos]});
				numbers.move(pos, (numbers.length - 1));
				numbers.pop();
			}
		}


		function flip(id){
			var elem = $("#" + id );
			
			if(flipped < 2){
				var cardId = getCardValue(id, cards);
				
				if(!elem.hasClass("flip")) {
					elem.removeClass("flip-over");
					elem.addClass("flip");
					elem.children(".back").addClass("n" + cardId).append('<p class="number">' + cardId + '</p>');
					
					elems.push(elem);
					flipped++;
				}
			}
			
			if(flipped == 2){
				setTimeout(function(){
					if(!checkEquals(elems)){
						for(var i = 0; i < 2; i++){
							elems[i].removeClass("flip");
							elems[i].addClass("flip-over");
						}
						
						setTimeout(function(){
							for(var i = 0; i < 2; i++){
								elems[i].children(".back").empty();
								elems[i].children(".back").removeClass("n" + getCardValue(elems[i].attr("id"), cards));
							}
							
							elems = [];
							flipped = 0;
						}, 250);
					} else {
						elems = [];
						flipped = 0;
					}			
							
					if(points === (cards.length / 2))
						if(confirm("Felicitaciones! Queres jugar de nuevo?"))
							start();
					
				}, 900);
			}
		}


		function checkEquals(elems){
			var values = [];
			
			for(var i = 0, j = 0; i < cards.length && j < 2; i++){
				if(elems[j].attr("id") === cards[i].square){
					values.push(cards[i].value);
					j++;
					i = -1;
				}
			}
				
			if(values[0] === values[1]){
				points++;
				return true;
			}
			return false;
		}
	})();
});


function getCardValue(id, cards){
	for(var i = 0; i < cards.length; i++){
		if(cards[i].square === id)
			return cards[i].value;
	}
}


Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
}