import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers.js';
import { connect } from 'react-redux';

class DeckView extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    const deck = this.props.navigation.state.params.entryId;
    const { decks } = this.props;

    return (
      <View style={styles.fullBox}>
      <View style={styles.box}>
        <Text style={styles.goldLarge}>{decks[deck].title}</Text>
        <Text style={styles.goldLarge}>{decks[deck].questions.length} Questions</Text>

        <TouchableOpacity style={styles.btn} 
                onPress={ () => { this.props.navigation.navigate('AddCard', { entryId: decks[deck].title }) }} >
          <Text>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} 
                onPress={ () => {
                  clearLocalNotification().then(setLocalNotification)
                  this.props.navigation.navigate('Quiz', { entryId: decks[deck].title }) } 
                }>
          <Text>Start Quiz</Text>
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
      return { decks }
}

export default connect(mapStateToProps)(DeckView);