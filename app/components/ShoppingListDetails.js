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

    render() {
        this.state.title = this.props.navigation.state.params.title;
        this.state.date = this.props.navigation.state.params.date;
        this.state.items = this.props.navigation.state.params.items;
        return (

            <View style={styles.container}>
                <Text>data: {this.state.title}</Text>
                <Text>datum: {this.state.date}</Text>

                <FlatList
                    data={this.state.items}

                    renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            rightIcon={{ name: 'close', style: { color: 'red' } }}
                            onPressRightIcon={() => {
                                var index = 0;
                                for (var i = 0; i < this.state.items.length; i++) {
                                    if (this.state.items[i].key == item.key) {
                                        index = i;
                                    }
                                }
                                this.state.items.splice(index, 1);
                                this.setState({ items: this.state.items });
                            }}

                        />

                    )}
                />

                <View style={styles.footer} >
                    <TouchableOpacity onPress={this.addItem.bind(this)} style={styles.addButton}>
                        <Text style={styles.addButtonText}> + </Text>
                    </TouchableOpacity>
                    <TextInput style={styles.textinput} onChangeText={(itemText) => this.setState({ itemText })}
                        value={this.state.itemText}
                        placeholder="> Item"></TextInput>
                </View>

            </View>
        );
    }

    addItem() {
        if (this.state.itemText) {
            var key = this.state.items.length+1;
            this.state.items.push({ 'key': key, 'name': this.state.itemText });
            this.setState({ items: this.state.itemArray });
            this.setState({ 'itemText': '' });   //resetten input veld
        }
    }





}

export default ShoppingListDetails;

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
