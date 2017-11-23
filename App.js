
import React, { Component } from 'react';
import Main from './app/components/Main';
import {StackNavigator} from 'react-navigation';
import ShoppingList from './app/components/ShoppingList';


const Navigation =  StackNavigator({
  Main: { screen: Main },
  ShoppingList: {screen: ShoppingList},
});

export default Navigation;

