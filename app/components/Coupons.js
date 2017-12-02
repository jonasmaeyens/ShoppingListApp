import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    ToastAndroid,
    Keyboard,
    FlatList,
} from 'react-native';
import {
    List, ListItem
} from 'react-native-elements';
import { Icon } from 'react-native-elements';

export default class Coupons extends Component {

      constructor(props) {
          super(props);
          this.state = {
              coupons: [
                  {
                      key: 1,
                      data: 'milk',
                  },
                  {
                      key: 2,
                      data: 'butter',
                  }
              ],
          };
          console.log(this);
      }

      render() {
        // if(typeof this.props.couponList !== "undefined" && this.props.navigation.state.params>this.state.coupons.length){
        //     console.log("Grotere list");
        //     this.state.coupons = this.props.navigation.state.params;
        // }
        const {navigate} = this.props.navigation;
          return (
              <View style={styles.container}>
                  <FlatList
                      data={this.state.coupons}

                      renderItem={({ item }) => (
                          <ListItem
                              title={item.data}
                              rightIcon={{ name: 'close', style: { color: 'red' } }}
                              onPressRightIcon={() => {
                                  var index = 0;
                                  for (var i = 0; i < this.state.coupons.length; i++) {
                                      if (this.state.coupons[i].key == item.key) {
                                          index = i;
                                      }
                                  }
                                  this.state.coupons.splice(index, 1);
                                  this.setState({ coupons: this.state.items });
                              }}
                          />
                      )}
                  />

                  <View style={styles.footer} >
                      <TouchableOpacity onPress={() => {
                        //this.addItem(),
                        navigate('ScanCoupon', {couponList: this.state.coupons})
                      }} style={styles.scanButton}>
                          <Text style={styles.scanButtonText}>Scan</Text>
                      </TouchableOpacity>
                  </View>

              </View>
          );
      }

      addItem() {
        console.log(this);
        this.state.coupons.push({ 'key': 3, 'name': "test" });
        //this.setState({ items: this.state.itemArray });
      }

  }

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          // backgroundColor: '#F5FCFF',
      },

      ScrollContainer: {
          flex: 1,
      },
      footer: {
          position: 'absolute',
          alignItems: 'center',
          bottom: 0,
          left: 0,
          right: 0,
      },
      scanButton: {
          backgroundColor: '#19b69a',
          flex:1,
          height:50,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
      },
      scanButtonText: {
          color: '#fff',
          fontSize: 24,
      },
      item: {
          position: 'relative',
          padding: 20,
          paddingRight: 100,
          borderBottomWidth: 2,
          borderBottomColor: '#ededed',
      },
      itemText: {
          paddingLeft: 20,
          borderLeftWidth: 10,
          borderLeftColor: '#ffbb00',
      },
      itemDelete: {
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2980b9',
          padding: 10,
          top: 10,
          bottom: 10,
          right: 10,
      },
      itemDeleteText: {
          color: '#fff',
      }
  });
