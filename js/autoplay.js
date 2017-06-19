function autoplay(pairs, cards){
	var autoplayCards = [];
	var intervalID = null;
	var i = 0;
	var click = 0;
	play();

	function play(){
		intervalID = setInterval(function(){
			if(i < pairs * 2){
				clickCard();
				i++;
			} else {
				clearInterval(intervalID);
				intervalID = null;
			}
		}, 1200);
	}

	if(intervalID)
		return;
	
	function clickCard() {
		var square = $("#square" + i).click();
		var squareID = square.attr("id");

		click++;

		autoplayCards.push({id: squareID, value: getCardValue(squareID, cards), flipped: false});

		var match = hasMatch();

		if(!(isNaN(match))){
			if(click % 2 === 1){
				click++;
				$("#square" + match).click();
				autoplayCards[match].flipped = true;
				autoplayCards[(autoplayCards.length - 1)].flipped = true;
			}
			// else{
			// 	i--;
			// }
		}
	}

	function hasMatch(){
		for(var j = 0; j < autoplayCards.length - 1; j++){
			if(!(autoplayCards[j].flipped) && (autoplayCards[(autoplayCards.length - 1)].value === autoplayCards[j].value)){
				return j;
			}
		}
	}
}

function getCardValue(id, cards){
	for(var i = 0; i < cards.length; i++){
		if(cards[i].square === id)
			return cards[i].value;
	}
}