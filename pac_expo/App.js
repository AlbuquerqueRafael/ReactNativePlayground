import React, { Component } from 'react';
import OptionsPAC from './OptionsPAC';
import { createAppContainer, createStackNavigator } from 'react-navigation'; 

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