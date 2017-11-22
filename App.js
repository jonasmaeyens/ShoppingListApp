
import React, { Component } from 'react';
import Main from './app/components/Main'
import StackNavigator from 'react-navigation'

export default class App extends React.Component {
  render() {
    return (
      <NavApp/>
    );

  }
}


const NavApp =  StackNavigator({
  Main: { screen: Main }
});