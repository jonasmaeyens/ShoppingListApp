/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Camera from 'react-native-camera';

export default class ScanCoupon extends Component {
  constructor(props) {
    
        super(props);
        this.state ={
          scanning:true,
          path:'',
          data:'',
          itemText:'',
          showInput:false,
          couponList:[]
        }
        console.log(this);
    }

  scanAndTakePicture = (e) =>  {

    if(this.state.scanning==true){

        this.setState({scanning:false})
      this.camera.capture()
        .then((data) => {
          //alert(e.data + " " + e.type);
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude,
              });
            });
          this.setState({ path: data.path, data: e.data});
          this.setState({showInput: true});
          this.refs.input.focus();

        })
        .catch(err => console.error('error ' + err));
    }
  }

  returnData=()=>{
    const { navigation } = this.props;
    navigation.goBack();
    console.log(this.state);
    navigation.state.params.onSelect({key: Date.now(), name: this.state.itemText, data:this.state.data, path: this.state.path ,lat: this.state.lat,long: this.state.long });
    
  }


  render() {
    const {goBack} = this.props.navigation;
    this.state.couponList = this.props.navigation.state.params.couponList;
    return (
      <View style={styles.container}>
        <TextInput ref='input' style={[(!this.state.showInput) ? styles.hidden:styles.textinput]}  multiline={false} onSubmitEditing={this.returnData}  onChangeText={(itemText) => this.setState({ itemText })}
          value={this.state.itemText}
          placeholder="Enter Coupon name"></TextInput>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.view}
          captureTarget={Camera.constants.CaptureTarget.disk}
          onBarCodeRead={this.scanAndTakePicture}
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
    flexDirection: 'column'
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  hidden:{
    height:0
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
  textinput: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(222, 222, 222,0.6)' ,
    height: 50,
    fontSize:15,
    padding: 10,
    borderTopWidth: 3,
    borderTopColor: '#ededed',
}
});
