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
    AsyncStorage
} from 'react-native';
import {
    List, ListItem
} from 'react-native-elements';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Separator from './Separator';
import uuid from 'react-native-uuid';
import { Date } from 'core-js/library/web/timers';

export default class Coupons extends Component {

      constructor(props) {
          super(props);
          this.state = {
              coupons: [
                //   {
                //       key: '6c84fb90-12c4-11e1-840d-7b25c5ee775a' ,
                //       name: 'milk',
                //       data:'13513242',
                //       path:'/var/mobile/Containers/Data/Application/1AAFF248-0…ocuments/51F37EF0-95BE-4BD7-BCF9-B3F47BD654F3.jpg',
                //     lat:'',
                //     long:''
                //     },
                //   {
                //       key: '0c84fb90-12c4-31g5-840d-7b25c5ee771a' ,
                //       name: 'butter',
                //       data:'5156534562',
                //       path:'/var/mobile/Containers/Data/Application/1AAFF248-0…ocuments/E3742D04-0F05-4BC1-8DCF-75A68FF19DBD.jpg',
                //       lat:'',
                //       long:''
                //     }
              ],
          };

          AsyncStorage.getItem('coupons')
          .then(req => JSON.parse(req))
          .then(json => this.setState({coupons:json}))
          .catch(error => console.log('error!'));
      }
    //   componentWillUnmount(){
    //       this.syncDataLocaly();
    //   }

      syncDataLocaly(){
          console.log('Syncing...');
          AsyncStorage.setItem('coupons', JSON.stringify(this.state.coupons))
          .then(json => console.log('success!'))
          .catch(error => console.log('error!'));
      }

      onSelect = (sendData) => {
        console.log(sendData);
        var joined = this.state.coupons.concat({key: sendData.key, data: sendData.data, name: sendData.name, path: sendData.path,lat:sendData.lat, long:sendData.long});
        this.setState({ coupons: joined })
        this.syncDataLocaly();
      };

      onScann = () => {
            this.props.navigation.navigate("ScanCoupon", { onSelect: this.onSelect });
      };

      deleteItem = (item)=>{
        var index = 0;
        for (var i = 0; i < this.state.coupons.length; i++) {
            if (this.state.coupons[i].key == item.key) {
                index = i;
            }
        }
        this.state.coupons.splice(index, 1);
        this.setState({ coupons: this.state.coupons });
        this.syncDataLocaly();
      }

    renderRow(item) {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => { this.deleteItem(item) }
          }];

        return (
          <Swipeout right={swipeBtns}
            backgroundColor= 'transparent'>
            <TouchableHighlight
                underlayColor ="rgba(187, 187, 187,0.6)"
                onPress={() => this.props.navigation.navigate('CouponDetail', { item: item})}
              >
              <View>
                <View style={styles.rowContainer}>
                  <Text style={styles.listItemText}> {item.name} </Text>
                </View>
                <Separator />
              </View>
            </TouchableHighlight>
          </Swipeout>
        )
      }

      render() {
        if(typeof this.props.couponList !== "undefined" && this.props.navigation.state.params>this.state.coupons.length){
            console.log("Grotere list");
            this.state.coupons = this.props.navigation.state.params;
        }

          return (
              <View style={styles.container}>
                  <FlatList
                      data={this.state.coupons}
                      extraData={this.state}
                      renderItem={({ item }) => (
                          this.renderRow(item)
                      )}
                  />

                  <View style={styles.footer} >
                      <TouchableOpacity onPress={this.onScann} style={styles.scanButton}>
                          <Text style={styles.scanButtonText}>Scan</Text>
                      </TouchableOpacity>
                  </View>

              </View>
          );
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
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 590,
      },
      rowContainer: {
        padding: 4,
      },
      listItemText: {
        flex: 2,
        fontSize: 20,
        padding: 8,
      }
  });
