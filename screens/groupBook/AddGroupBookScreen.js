import React, {Component} from "react";
import firebase from "../../database/firebaseDb";
import {ActivityIndicator, Button, ScrollView, StyleSheet, TextInput, View} from "react-native";

class AddGroupBookScreen extends Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('/groupBook');
        this.state = {
            id: '',
            groupName: '',
            description: '',
            isLoading: false
        };
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };
    storeGroupBook() {
        if(this.state.name === ''){
            alert('Fill at least your name!')
        } else {
            this.setState({
                isLoading: true,
            });
            this.dbRef.add({
                id: this.state.id,
                groupName: this.state.groupName,
                description: this.state.description,
            }).then((res) => {
                this.setState({
                    id: '',
                    groupName: '',
                    description: '',
                    isLoading: false,
                });
                this.props.navigation.navigate('GroupBookScreen')
            })
                .catch((err) => {
                    console.error("Error found: ", err);
                    this.setState({
                        isLoading: false,
                    });
                    throw err;
                });
        }
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Id'}
                        value={this.state.id}
                        onChangeText={(val) => this.inputValueUpdate(val, 'id')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Nazwa grupy'}
                        value={this.state.groupName}
                        onChangeText={(val) => this.inputValueUpdate(val, 'groupName')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Opis'}
                        value={this.state.description}
                        onChangeText={(val) => this.inputValueUpdate(val, 'description')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Dodaj grupę '
                        onPress={() => this.storeGroupBook()}
                        color="#19AC52"
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default AddGroupBookScreen;