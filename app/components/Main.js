
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {StackNavigator} from 'react-navigation';




export default class Main extends React.Component {
    static navigationOptions = {
        title: 'Shopping Lists',
      };
      
    render() {
        const { navigate } = this.props.navigation;
        console.log(this.props);
        
        return (
            <View style={styles.container}>
            
                <ScrollView style={styles.ScrollContainer}>

                </ScrollView>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => navigate('ShoppingList')}>
                    <Text style={styles.addButtonText}>NEW</Text>
                </TouchableOpacity>
                
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
        bottom:20,
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
        color: '#fff',
        padding: 15,
        paddingTop: 56,

        borderTopWidth: 22,
        borderTopColor: '#ededed',
    }
});