export const ADD_DECK = 'ADD_DECK';
export const GET_DECKS = 'GET_DECKS';
export const ADD_CARD = 'ADD_CARD';

export function addDeck(deck) {
	console.log('pppppppppppp')
	console.log(deck)
	return {
		type: ADD_DECK,
		deck,
	}
}

export function receiveDecks(decks) {
	return {
		type: GET_DECKS,
		decks,
	}	
}

export function addCard(card) {
	return {
		type: ADD_CARD,
		card,
	}	
}