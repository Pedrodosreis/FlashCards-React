export const ADD_DECK = 'ADD_DECK';
export const GET_DECKS = 'GET_DECKS';
export const ADD_CARD = 'ADD_CARD';

export default function decks(state = {}, action) {
  
  switch (action.type) {
    case ADD_DECK:
      const newDeck = {
      	[action.deck] : {
      		title: action.deck,
      		questions: [],
      	}
      }
      return {
      	...state,
      	...newDeck,
      }

    case GET_DECKS:
      return {
      	...state,
      	...action.decks,
      }

    case ADD_CARD:
      const { deck, question, answer } = action.card
      return {
      	...state,
      	[deck]: {
      		...state[deck],
      		questions: [...state[deck].questions, {question, answer}]
      	}
      }

    default:
      return state
  }
}