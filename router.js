
import React, { Component } from 'react';
import {StackNavigator,Button, TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import Main from './app/components/Main';
import ShoppingListDetails from './app/components/ShoppingListDetails';
import Coupons from './app/components/Coupons';
import ScanCoupon from './app/components/ScanCoupon';


export const ListNav =  StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: 'Shopping Lists',
    },
  },
  ShoppingListDetails: {
    screen: ShoppingListDetails,

  },
});

export const CouponNav =  StackNavigator({
  Coupons: {
    screen: Coupons,
    navigationOptions:({navigation})=>{
      return {
        title: 'Coupon List',
        headerTitleStyle :{color:'#f2f',paddingRight:30},
        headerRight: <Icon style={{ marginRight:15, color:'#f2f' }} name="barcode-scan" type='material-community' size={33} onPress={() => navigation.navigate('ScanCoupon')}/>
      };
    },
  },
  ScanCoupon: {
    screen: ScanCoupon,
    title: 'Scanner',
  },
});

export default Navigation = TabNavigator({
  ListNav: {
    screen: ListNav,
    navigationOptions: {
      tabBarLable:"Lists",
      tabBarIcon: ({ tintColor }) => (
      <Icon name="list" size ={35} color={tintColor}/>
      ),
    },
  },
  CouponNav: {
    screen: CouponNav,
    navigationOptions: {
      tabBarLable:"Lists",
      tabBarIcon: ({ tintColor }) => (
      <Icon name="barcode" type='material-community' size ={31} color={tintColor}/>
      ),
    },
  },
});
