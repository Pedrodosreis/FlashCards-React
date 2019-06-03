import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { addCard } from '../actions/decks'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux';


class AddCard extends React.Component {

  state = {
    question: '',
    answer: '',
  }

  handleQuestionChange = (question) => {
    this.setState( {
      question: question,
      })
  }

  handleAnswerChange = (answer) => {
    this.setState( {
      answer: answer,
      })
  }

  handlePress = (deck) => {

    const {question, answer} = this.state;

    this.props.dispatch(addCard( { deck, question, answer } ));
    addCardToDeck(deck, { question, answer } )
    this.props.navigation.dispatch(NavigationActions.back( { key: null }))

    this.setState( {
      question: '',
      answer: '',
      })
  }

  render() {

    const deckName = this.props.navigation.state.params.entryId;

    return (
      <View style={styles.fullBox}>
      <View style={styles.box}>
        <Text style={styles.goldLarge}>Question</Text>
        <TextInput style={styles.inputLarge} value={this.state.question} onChangeText={this.handleQuestionChange} />

        <Text style={styles.goldLarge}>Answer</Text>
        <TextInput style={styles.inputLarge} value={this.state.answer} onChangeText={this.handleAnswerChange} />

        <TouchableOpacity style={styles.btn} onPress={() => this.handlePress(deckName)} title='Add to Deck'> 
          <Text>Add to Deck</Text>
        </TouchableOpacity>
      </View>
      </View>
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
  goldsmall: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 12,
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

export default connect()(AddCard);