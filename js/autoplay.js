var autoplaying;

function autoplay(pairs, cards){
	if(autoplaying){
		alert("It is already playing!");
		return;
	}
	
	var autoplayCards = [];
	var i = 0;
	var click = 0;

	var intervalID = setInterval(function(){
		if(i < (pairs * 2)){
			autoplaying = true;
			clickCard();
			i++;
		} else {
			autoplaying = false;
			clearInterval(intervalID);
			intervalID = null;
		}
	}, 1400);

	
	function clickCard() {
		var square = $("#square" + i).click();
		var squareID = square.attr("id");
		var cardValue = getCardValue(squareID, cards);

		click++;

		var match = hasMatch(cardValue);

		if(typeof(match) === 'object'){
			if(click % 2 === 1){
				click++;
				$("#" + match.id).click();
				autoplayCards.move(match.pos, (autoplayCards.length - 1));
				autoplayCards.pop();
			}else if((match.id.substring(6)) < (i - 1)){
				i--;
			}
		} else {
			autoplayCards.push({id: squareID, value: cardValue});
		}
	}


	function hasMatch(cardValue){
		for(var j = 0; j < autoplayCards.length; j++){
			if(!(autoplayCards[j].flipped) && (cardValue === autoplayCards[j].value)){
				return {id: autoplayCards[j].id, pos: j};
			}
		}
	}
}