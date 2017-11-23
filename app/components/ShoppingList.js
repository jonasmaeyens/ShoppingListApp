import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Main from './Main'
import Item from './Item'



export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            itemArray: [],
            itemText: '',
        }
    };
    static navigationOptions = {
        title: 'Shopping List Title',
    };
    componentDidMount() {
        //console.log(this.props)
    }
    render() {
        const { navigate } = this.props.navigation;
        let items = this.state.itemArray.map((val,key) => {
            return <Item key={key} keyval={key} val={val} deleteMethod={() => this.deleteItem(key) } />
          });
        return (
            <View style={styles.container}>
            <ScrollView style={styles.ScrollContainer}>
                {items}
                </ScrollView>
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
            var d = new Date();
            this.state.itemArray.push({ 'date': d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(), 'item': this.state.itemText });
            this.setState({ itemArray: this.state.itemArray });
            this.setState({ 'itemText': '' });   //resetten input veld
            console.log('items in array' + this.state.itemArray);
        }
    }
    deleteItem(key){
        this.state.itemArray.splice(key,1);
        this.setState({itemArray:this.state.itemArray});
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
        //color: '#fff',
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
        borderLeftColor: '#E91E63',
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