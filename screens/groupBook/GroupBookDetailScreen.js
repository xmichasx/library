import React, {Component} from "react";
import firebase from "../../database/firebaseDb";
import {ActivityIndicator, Alert, Button, ScrollView, StyleSheet, TextInput, View} from "react-native";

class GroupBookDetailScreen extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            groupName: '',
            description: ''
        };
    }

    componentDidMount() {
        console.log(this.props.route.params.groupBookKey);
        const dbRef = firebase.firestore().collection('groupBook').doc(this.props.route.params.groupBookKey);
        dbRef.get().then((res) => {
            if (res.exists) {
                const groupBook = res.data();
                this.setState({
                    key: res.id,
                    id: groupBook.id,
                    groupName: groupBook.groupName,
                    description: groupBook.description,
                    isLoading: false
                });
            } else {
                console.log("Document does not exist!");
            }
        });
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    updateGroupBook() {
        this.setState({
            isLoading: true,
        });
        const updateDBRef = firebase.firestore().collection('groupBook').doc(this.state.key);
        updateDBRef.set({
            id: this.state.id,
            groupName: this.state.groupName,
            description: this.state.description,
        }).then((docRef) => {
            this.setState({
                id: '',
                groupName: '',
                description: '',
                isLoading: false,
            });
            this.props.navigation.navigate('GroupBookScreen');
        })
            .catch((error) => {
                console.error("Error: ", error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    deleteGroupBook() {
        const dbRef = firebase.firestore().collection('/groupBook').doc(this.props.route.params.groupBookKey);
        dbRef.delete().then((res) => {
            console.log('Item removed from database');
            this.props.navigation.navigate('GroupBookScreen');
        })
    }

    openTwoButtonAlert=()=>{
        Alert.alert(
            'Usuwanie grupy',
            'Jeteś pewny usunięcia grupy?',
            [
                {text: 'Tak', onPress: () => this.deleteGroupBook()},
                {text: 'Nie', onPress: () => console.log('No item was removed'), style: 'cancel'},
            ],
            {
                cancelable: true
            }
        );
    };

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
                        placeholder={'Opis grupy'}
                        value={this.state.description}
                        onChangeText={(val) => this.inputValueUpdate(val, 'description')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Zapisz'
                        onPress={() => this.updateGroupBook()}
                        color="#19AC52"
                    />
                </View>
                <View>
                    <Button
                        title='Usuń'
                        onPress={this.openTwoButtonAlert}
                        color="#E37399"
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
    },
    button: {
        marginBottom: 7,
    }
});


export default GroupBookDetailScreen;