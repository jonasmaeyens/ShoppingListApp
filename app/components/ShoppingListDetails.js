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
    Card,List,Button, ListItem
} from 'react-native-elements';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Separator from './Separator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class ShoppingListDetails extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
      });

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            items: [],
        };
    }


    deleteItem = (item)=>{
        var index = 0;
        for (var i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].key == item.key) {
                index = i;
            }
        }
        this.state.items.splice(index, 1);
        this.setState({ items: this.state.items });
    }
    addItem =() => {
        if (this.state.itemText) {
            var key = this.state.items.length+1;
            this.state.items.push({ 'key': key, 'name': this.state.itemText });
            this.setState({ items: this.state.itemArray });
            this.setState({ 'itemText': '' });   //resetten input veld
        }
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
              //onPress={() => this.props.navigation.navigate('ShoppingListDetails', { title: item.title, date: item.date, items: item.items })}
              //onLongPress={() => this.share(item)}
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
        this.state.title = this.props.navigation.state.params.title;
        this.state.date = this.props.navigation.state.params.date;
        this.state.items = this.props.navigation.state.params.items;
        return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
            >
                <Card title={this.state.title}>
                    <Text>datum: {this.state.date}</Text>
                </Card>
                
                <FlatList
                    data={this.state.items}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        this.renderRow(item)
                    )}
                />

                <View style={styles.footer} >
                    <TouchableOpacity onPress={this.addItem} style={styles.addButton}>
                        <Text style={styles.addButtonText}> + </Text>
                    </TouchableOpacity>
                    <TextInput style={styles.textinput} multiline={false} onSubmitEditing={this.addItem}  onChangeText={(itemText) => this.setState({ itemText })}
                        value={this.state.itemText}
                        placeholder="> Item"></TextInput>
                </View>

            </KeyboardAwareScrollView>
        );
    }







}

export default ShoppingListDetails;

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
    
