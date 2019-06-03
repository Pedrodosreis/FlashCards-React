import { AsyncStorage } from 'react-native';
import { TabNavigator } from 'react-navigation'

export const FLASHCARDS_STORAGE_KEY = 'FlashCards:Udacity'

export const getDecks = {
  Java: {
    title: 'Java',
    questions: [
      {
        question: 'The modules operator (%) in Java can be used only with variables of integer type.',
        answer: 'The modulus operator (%) may be used with floating-point as well as integer types. It returns the remainder 
        of a division operation, e.g., 10 % 6 will return 4.',
        correctAnswer: 'false',
      },
      {
        question: 'Declarations must appear at the start of the body of a Java method.',
        answer: 'They can appear anywhere within the body of the method.',
        correctAnswer: 'false',
      },
      {
        question: 'Variables declared inside a for loop are limited in scope to the loop.',
        answer: 'Any variable declared within a block statement such as a for or if cannot be referenced outside the block.',
        correctAnswer: 'false',
      },
      {
        question: 'Objects of a subclass can be assigned to a super class reference.',
        answer: 'Objects of a super class may not be assigned to a sub class reference. Food for thought: why is it so??',
        correctAnswer: 'true',
      },
    ]
  }
}

export function submitEntry( title ) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title: title,
			questions: [],	
		}
	}))
}

export function getAllDecks (deck) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then( (results) => {
			if(results === null) {
				console.log('2')
				AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(getDecks))
				return getDecks
			} else {
				console.log('3')
				return JSON.parse(results)
			}
		})
}

export function clearStorage() {
	try {
		AsyncStorage.clear();
	} catch (error) {
	}
}

export function addCardToDeck(name, card) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then( (results) => JSON.parse(results))
		.then(results => {
			results[name].questions.push(card)
			AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON,stringify(results))
			return results;
		})
}






