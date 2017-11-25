
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
} from 'react-native';
import {
    List, ListItem
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import ShoppingList from './ShoppingList';



export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shoppingLists: [
                {
                    key: 1,
                    title: 'colruyt',
                    date: '20/10/2016',
                    items: [
                        {
                            key: 1,
                            name: 'milk',
                        },
                        {
                            key: 2,
                            name: 'butter',
                        }
                    ],
                },
                {
                    key: 2,
                    title: 'verjaarqdsfffdag',
                    date: '20/10/2019',
                    items: [
                        {
                            key: 1,
                            name: 'taart',
                        },
                        {
                            key: 2,
                            name: 'burzeferfrtter',
                        }
                    ],
                }
            ]
        };
    }

    static navigationOptions = {
        title: 'Shopping Lists',
    };

    render() {

        shoppingListArray = this.state.shoppingLists;
        const { navigate } = this.props.navigation;
        console.log(this.props);

        return (
            <View style={styles.container}>
                <FlatList
                    data={shoppingListArray}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            subtitle={item.date}
                            onPress={() => this.props.navigation.navigate('ShoppingListDetails', { title: item.key, date: item.date, items: item.items })}
                            leftIcon={{ name: 'check', style: { color: 'green' } }}
                            leftIconOnPress={() =>{
                                var index = 0;
                                for (var i = 0; i < this.state.shoppingLists.length; i++) {
                                    if (this.state.shoppingLists[i].key == item.key) {
                                        index = i;
                                    }
                                }
                                this.state.shoppingLists.splice(index, 1);
                                this.setState({ shoppingLists: this.state.shoppingLists });
                            }
                            }
                        />
                    )}
                />

                <View style={styles.footer} >
                    <TouchableOpacity onPress={this.addItem.bind(this)} style={styles.addButton}>
                        <Text style={styles.addButtonText}> NEW </Text>
                    </TouchableOpacity>
                    <TextInput style={styles.textinput} onChangeText={(itemText) => this.setState({ itemText })}
                        value={this.state.itemText}
                        placeholder="> Title">
                    </TextInput>
                </View>

            </View>
        );
    }

    addItem() {
        if (this.state.itemText) {
            var key = this.state.shoppingLists.length + 1;
            var date = new Date;
            this.state.shoppingLists.push({ 'key': key, 'title': this.state.itemText ,'items':[],date: date.getDate() +'/'+(date.getMonth()+1)+'/'+date.getFullYear()});
            this.setState({ items: this.state.itemArray });
            this.setState({ 'itemText': '' });   //resetten input veld
            Keyboard.dismiss();
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
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
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#ffbb00',
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        zIndex: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    textinput: {
        alignSelf: 'stretch',
        padding: 15,
        paddingTop: 56,

        borderTopWidth: 22,
        borderTopColor: '#ededed',
    }
});