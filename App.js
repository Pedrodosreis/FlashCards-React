import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers'

import MainPage from './components/MainPage'
import AddNewDeck from './components/AddNewDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

import { Feather } from '@expo/vector-icons'

const Tabs = createBottomTabNavigator({
    MainPage: {
      screen: MainPage,
      navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              const iconName = `menu`;
              return <Feather name={iconName} size={25} color={tintColor} />;
          },
          title: 'Main Page',
          backgroundColor: 'grey',
      },
    },
    AddNewDeck: {
      screen: AddNewDeck,
      navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              const iconName = `plus-circle`;
              return <Feather name={iconName} size={25} color={tintColor} />;
          },
          title: 'Add New Deck',
      },
    }
  })

const MainNav = createStackNavigator({
    Home: {
      screen: Tabs,
      navigationOptions: {          
          title: 'Flash Cards',
          headerTintColor: 'gold',
          headerStyle: {
            backgroundColor: 'red',
          },
      },
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: {          
          title: 'Deck View',
          headerTintColor: 'gold',
          headerStyle: {
            backgroundColor: 'red',
          },
      },
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {          
          title: 'Add Card',
          headerTintColor: 'gold',
          headerStyle: {
            backgroundColor: 'red',
          },
      },
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {          
          title: 'Quiz',
          headerTintColor: 'gold',
          headerStyle: {
            backgroundColor: 'red',
          },
      },
    },
  })

const MainNavContainer = createAppContainer(MainNav);

export default class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <MainNavContainer />
      </Provider>
    );
  }
}