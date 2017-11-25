
import React, { Component } from 'react';
import Main from './app/components/Main';
import {StackNavigator} from 'react-navigation';
import ShoppingList from './app/components/ShoppingList';
import ShoppingListDetails from './app/components/ShoppingListDetails';


const Navigation =  StackNavigator({
  Main: { screen: Main },
  ShoppingList: {screen: ShoppingList},
  ShoppingListDetails: {screen: ShoppingListDetails},
});

export default Navigation;

