
import React, { Component } from 'react';
import {StackNavigator,Button, TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import Main from './app/components/Main';
import ShoppingListDetails from './app/components/ShoppingListDetails';
import Coupons from './app/components/Coupons';
import ScanCoupon from './app/components/ScanCoupon';
import CouponDetail from './app/components/CouponDetail';


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
    navigationOptions: ({navigation}) => ({
      
    }),
  },
  ScanCoupon: {
    screen: ScanCoupon,
    navigationOptions: ({navigation}) => ({
      
    }),
  },
  CouponDetail: {
    screen: CouponDetail,
    navigationOptions: ({navigation}) => ({
      
    }),
  },
},{
  headerMode: 'screen'
});



export default Navigation = TabNavigator({
  ListNav: {
    screen: ListNav,
    navigationOptions: {
      title: 'Shopping Lists',
      tabBarLable:"Lists",
      tabBarIcon: ({ tintColor }) => (
      <Icon name="list" size ={35} color={tintColor}/>
      ),
    },
  },
  CouponNav: {
    screen: CouponNav,
    navigationOptions: {
      title: 'Coupons',
      tabBarLable:"Lists",
      tabBarIcon: ({ tintColor }) => (
      <Icon name="barcode" type='material-community' size ={31} color={tintColor}/>
      ),
    },
  },
});
