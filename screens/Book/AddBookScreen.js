import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebaseDb';

class AddBookScreen extends Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('/book');
        this.state =
        {
            id: '',
            tytul: '',
            data_wydania: '',
            autor: '',
            ISBN: '',
            kod_kreskowy: '',
            zdjecieUrl: '',
            wydawnictwo: '',
            status: '',
            grupaKsiazekID: '',
            isLoading: false
        };
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };
    storeBook() {
        if(this.state.name === ''){
            alert('Fill at least your name!')
        } else {
            this.setState({
                isLoading: true,
            });
            this.dbRef.add({
                id: this.state.id,
                tytul: this.state.tytul,
                data_wydania: this.state.data_wydania,
                autor: this.state.autor,
                ISBN: this.state.ISBN,
                kod_kreskowy: this.state.kod_kreskowy,
                zdjecieUrl: this.state.zdjecieUrl,
                wydawnictwo: this.state.wydawnictwo,
                status: this.state.status,
                grupaKsiazekID: this.state.grupaKsiazekID,
            }).then((res) => {
                this.setState({
                    id: '',
                    tytul: '',
                    data_wydania: '',
                    autor: '',
                    ISBN: '',
                    kod_kreskowy: '',
                    zdjecieUrl: '',
                    wydawnictwo: '',
                    status: '',
                    grupaKsiazekID: '',
                    isLoading: false,
                });
                this.props.navigation.navigate('BookScreen')
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
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'id')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Tytul'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'tytul')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Data Wydania'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'data_wydania')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Autor'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'autor')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'ISBN'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'ISBN')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Kod kreskowy'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'kod_kreskowy')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Zdjęcie Url'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'zdjecieUrl')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Wydawnictwo'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'wydawnictwo')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Status'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'status')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Grupa książek'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'grupaKsiazekID')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Dodaj książkę '
                        onPress={() => this.storeBook()}
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


export default AddBookScreen;