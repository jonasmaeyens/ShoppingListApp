
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Platform,
    TouchableHighlight,
    ToastAndroid,
    Keyboard,
    Share,
    AsyncStorage
} from 'react-native';
import {
    List, ListItem
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import Separator from './Separator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            shoppingLists: [
                // {
                //     key: 1,
                //     title: 'colruyt',
                //     date: '20/10/2016',
                //     items: [
                //         {
                //             key: 1,
                //             name: 'milk',
                //         },
                //         {
                //             key: 2,
                //             name: 'butter',
                //         }
                //     ],
                // },
                // {
                //     key: 2,
                //     title: 'verjaarqdsfffdag',
                //     date: '20/10/2019',
                //     items: [
                //         {
                //             key: 1,
                //             name: 'taart',
                //         },
                //         {
                //             key: 2,
                //             name: 'burzeferfrtter',
                //         }
                //     ],
                // }
            ]
        };

        AsyncStorage.getItem('shoppingLists')
        .then(req => JSON.parse(req))
        .then(json => this.setState({shoppingLists:json}))
        .catch(error => console.log('error!'));
    }
    componentWillUnmount(){
        this.syncDataLocaly();
    }

    syncDataLocaly(){
        console.log('Syncing...');
        AsyncStorage.setItem('shoppingLists', JSON.stringify(this.state.shoppingLists))
        .then(json => console.log('success!'))
        .catch(error => console.log('error!'));
    }

    share = (item) =>{
        var msg = '';
        for(var i = 0; i < item.items.length; i++){
            msg += '\r'+'-'+item.items[i].name;
        }
        Share.share({
            message: '----'+item.title +'----- \r' + msg,
            title: 'lol'
        })
    }
    deleteItem = (item)=>{
        var index = 0;
        for (var i = 0; i < this.state.shoppingLists.length; i++) {
            if (this.state.shoppingLists[i].key == item.key) {
                index = i;
            }
        }
        this.state.shoppingLists.splice(index, 1);
        this.setState({ shoppingList: this.state.shoppingLists });
        this.syncDataLocaly();
    }

    addItem= ()=> {
        if (this.state.itemText) {
            var key = this.state.shoppingLists.length + 1;
            var date = new Date;
            this.state.shoppingLists.push({ 'key': Date.now(), 'title': this.state.itemText, 'items': [], date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() });
            this.setState({ items: this.state.itemArray });
            this.setState({ 'itemText': '' });   //resetten input veld
            Keyboard.dismiss();
            this.syncDataLocaly();
        }
    }


    renderRow(item) {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => { this.deleteItem(item) }
          },{
            text: 'Share',
            backgroundColor: '#44af25',
            onPress: () => { this.share(item) }
          }];

        return (
          <Swipeout right={swipeBtns}
            backgroundColor= 'transparent'>
            <TouchableHighlight
                underlayColor ="rgba(187, 187, 187,0.6)"
              onPress={() => this.props.navigation.navigate('ShoppingListDetails', { title: item.title, date: item.date, items: item.items })}
              onLongPress={() => this.share(item)}
              >
              <View>
                <View style={styles.rowContainer}>
                  <Text style={styles.listItemText}> {item.title} </Text>
                </View>
                <Separator />
              </View>
            </TouchableHighlight>
          </Swipeout>
        )
      }

    render() {

        shoppingListArray = this.state.shoppingLists;
        const { navigate } = this.props.navigation;
        console.log(this.props);

        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            //onPress: () => { this.deleteNote(rowData) }
          },{
            text: 'Share',
            backgroundColor: '#44af25',
            onPress: () => { this.share(item) }
          }];

        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
          >
                <FlatList
                    data={shoppingListArray}
                    extraData={this.state}
                    renderItem={({ item }) => (
                          // Swipeout component
                          this.renderRow(item)
                    )}
                />

                <View style={styles.footer} >
                    <TouchableOpacity onPress={this.addItem} style={styles.addButton}>
                        <Text style={styles.addButtonText}> NEW </Text>
                    </TouchableOpacity>
                    <TextInput style={styles.textinput} multiline={false} onSubmitEditing={this.addItem}  onChangeText={(itemText) => this.setState({ itemText })}
                        value={this.state.itemText}
                        placeholder="> Title">
                    </TextInput>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}


const styles = StyleSheet.create({

    header: {
        backgroundColor: '#ffbb00',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
    },
    headertext: {
        color: '#333333',
        fontSize: 18,
        padding: 20,
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
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 3,
        backgroundColor: '#ffbb00',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        zIndex: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 19,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 70,
        fontSize:16,
        padding: 15,
        borderTopWidth: 3,
        borderTopColor: '#ededed',
    }
});
