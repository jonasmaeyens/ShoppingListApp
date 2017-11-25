
import React, { Component } from 'react';
import Main from './app/components/Main';
import {StackNavigator} from 'react-navigation';
import ShoppingListDetails from './app/components/ShoppingListDetails';


const Navigation =  StackNavigator({
  Main: { screen: Main },
  ShoppingListDetails: {screen: ShoppingListDetails},
});

export default Navigation;

