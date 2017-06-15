function autoplay(qty, cards){
	var autoplayCards = [];
	var intervalID;
	var i = 0;
	play();
	
	function loop(click) {
		alert(click);
		$("#square" + i).click();
		autoplayCards.push({id: "square" + i, value: getCardValue("square" + i, cards)});

		if(autoplayCards.length > 1){
			hasMatch();
		}
	}

	function hasMatch(){
		var match = false;

		for(var j = 0; j < autoplayCards.length - 1 && !match; j++){

			if((autoplayCards[(autoplayCards.length - 1)].value === autoplayCards[j].value)){
				$("#square" + j).click();
				match = true;
				return true;
			}
		}

		return false;
	}

	
	if(intervalID)
		return;
	
	function play(){
		var click = 0;
		intervalID = setInterval(function(){
			if(i < qty * 2){
				click = click % 2;
				loop(click);
				i++;
			}
			else{
				clearInterval(intervalID);
				intervalID = null;
			}
		}, 1500);
	}
}

function getCardValue(id, cards){
	for(var i = 0; i < cards.length; i++){
		if(cards[i].square === id)
			return cards[i].value;
	}
}