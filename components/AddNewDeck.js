import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { submitEntry } from '../utils/api'
import { addDeck } from '../actions/decks'
import { connect } from 'react-redux';


class AddNewDeck extends React.Component {

  state = {
    text: '',
  }

  handleTextChange = (text) => {
    this.setState( {
      text: text,
      })

  }

  handlePress = () => {

    submitEntry(this.state.text);
    this.props.dispatch(addDeck(this.state.text));
    this.props.navigation.navigate('DeckView', { entryId: this.state.text })

    this.setState( {
      text: '',
      })
  }

  render() {

    const { text } = this.state;

    return (
      <View style={styles.fullBox}>
      <View style={styles.box}>
        <Text style={styles.goldLarge} >Name of Deck</Text>
        <TextInput style={styles.inputLarge} value={text} onChangeText={this.handleTextChange} />
        <TouchableOpacity style={styles.btn} onPress={this.handlePress} title='Send Deck'>
          <Text>Send Deck</Text>
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

export default connect()(AddNewDeck);