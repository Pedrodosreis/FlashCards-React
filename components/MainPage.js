import React from 'react';
import { Text, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { getDecks } from '../utils/api.js'; 
import { getAllDecks, clearStorage } from '../utils/api.js';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions/decks'
import { Feather } from '@expo/vector-icons'

class MainPage extends React.Component {

  componentDidMount() {
    clearStorage();
    getAllDecks()
    .then(decks => this.props.receiveAllDecks(decks))
  }

  render() {
      const { decks } = this.props;

    return (
      <ScrollView style={styles.fullBox}>
        {Object.keys(decks).map((deck) => {
          const {title, questions } = decks[deck]
          return (
            <View key={title} style={styles.box}>
              <Text style={styles.goldLarge}>{title}</Text>
              <Text style={styles.goldLarge}>{questions.length} questions</Text>
              <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('DeckView', {entryId: deck})}
                  title='view Deck'>
                  <Text>View Deck</Text>
              </TouchableOpacity>
            </View>
          )
        })}        
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


function mapDispatchToProps ( dispatch ) {
  return {
    receiveAllDecks: (decks) => dispatch(receiveDecks(decks))
  }
}

function mapStateToProps ( decks ) {
      return { 
        decks 
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);