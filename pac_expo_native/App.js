import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; 
import OptionsPAC from './OptionsPAC';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: OptionsPAC,
    }
  },
  {
    initialRouteName: 'Home',
  }
);


const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
