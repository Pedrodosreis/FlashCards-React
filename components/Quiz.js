import React from 'react';
import { getDecks } from '../utils/api.js'; 
import { getAllDecks, clearStorage } from '../utils/api.js';
import { connect } from 'react-redux';
import { submitEntry } from '../utils/api'
import { addDeck } from '../actions/decks'

import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class Quiz extends React.Component {

	state = {
		qNumber: 0,
		showAnswer: false,
		correct: 0,
	}

	handleAnswer = () => {
		this.setState( { showAnswer: !this.state.showAnswer })
	}

	handleCorrect = () => {
			this.setState( { correct: this.state.correct + 1 })
		  this.setState( { showAnswer: false, qNumber: this.state.qNumber + 1})
	}

  handleIncorrect = () => {
    this.setState( { showAnswer: false, qNumber: this.state.qNumber + 1})
  }

  clearQuizInfo = () => {
    this.setState( { 
      showAnswer: false, 
      qNumber: 0,
      correct: 0,
    })
  }


  render() {

  	const qNumber = this.state.qNumber;
  	const { decks } = this.props;
  	const deck = this.props.navigation.state.params.entryId;
  	const number = this.state.qNumber + 1;
  	const finished = qNumber === decks[deck].questions.length

    return (
      <ScrollView style={styles.fullBox}>
    	<View style={styles.box}>
    	{finished ?
    		<View>
	      		<Text style={styles.goldLarge}>You got {this.state.correct} of {decks[deck].questions.length} questions, Congratulations !!!</Text>

	      		<TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('DeckView', {entryId: deck})} 
	      					title='Back to Home'> 
                  <Text>Back to Deck</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => this.clearQuizInfo()} 
                  title='Back to Home'> 
                  <Text>Try Again</Text>
            </TouchableOpacity>
      		</View>
      		:
      		<View>
		      	<Text style={styles.goldLarge}>{number} / {decks[deck].questions.length}</Text>

		      	<Text style={styles.goldLarge}>{decks[deck].questions[this.state.qNumber].question}</Text>            

		        {!this.state.showAnswer ? <TouchableOpacity style={styles.box} 
                style={styles.btn} onPress={ this.handleAnswer } title='Check the Answer'>
                  <Text>Check the answer</Text>
                </TouchableOpacity>
				: <Text style={styles.goldLarge}>{decks[deck].questions[this.state.qNumber].answer}</Text>}

		        <TouchableOpacity style={styles.btn} onPress={ () => this.handleCorrect() } title='Correct'>
              <Text>Correct</Text>
            </TouchableOpacity>
		        <TouchableOpacity style={styles.btn} onPress={ () => this.handleIncorrect() } title='Not Correct'>
              <Text>Not Correct</Text>
            </TouchableOpacity>
      		</View>
    	}
    	</View>
      </ScrollView> 	       
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'red',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
  goldLarge: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  inputLarge: {
    fontSize: 30,
    borderColor: 'gold',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    width: '95%',
    margin: 10,
  },
  btn: {
    backgroundColor: 'gold',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },  
  fullBox: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
  },
});

function mapStateToProps ( decks ) {
      return { 
        decks 
      }
}

export default connect(mapStateToProps)(Quiz);