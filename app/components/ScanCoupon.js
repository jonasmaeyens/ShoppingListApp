/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Camera from 'react-native-camera';

export default class ScanCoupon extends Component {
  constructor(props) {
        super(props);
        this.state ={couponList:[]}
        console.log(this);
    }



  onBarCodeRead = (e) => {
    console.log(this);
    console.log(e);
    alert(e.data);
    var key = this.state.couponList.length+ 1;
    const {goBack} = this.props.navigation;
    this.state.couponList.push({ 'key': key, 'data': e.data});
    console.log(this);
    // this.props.navigation.setParams(this.state.couponList);
    //navigate('Coupons',{couponList: this.state.couponList});
    // goBack();
  }


  render() {
    const {goBack} = this.props.navigation;
    // console.log(this.props.navigation.state.params);
    // this.setState(prevState => ({
    //   couponList: [...prevState.couponList, this.props.navigation.state.params]
    // }));
    this.state.couponList = this.props.navigation.state.params.couponList;
    console.log(this);
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.view}
          onBarCodeRead={this.onBarCodeRead}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>

        <View style={styles.footer} >
            <TouchableOpacity onPress={() => goBack()} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  footer: {
      position: 'absolute',
      alignItems: 'center',
      bottom: 0,
      left: 0,
      right: 0,
  },
  cancelButton: {
      backgroundColor: '#19b69a',
      flex:1,
      height:50,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
  },
  cancelText: {
      color: '#fff',
      fontSize: 24,
  },
});
