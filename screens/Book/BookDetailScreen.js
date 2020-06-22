import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebaseDb';
import RNPickerSelect from "react-native-picker-select";

class BookDetailScreen extends Component {
    groupBookArr = [];
    constructor() {
        super();
        this.state = {
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
            isLoading: true
        };
    }

    componentDidMount() {
        const dbRef = firebase.firestore().collection('book').doc(this.props.route.params.bookKey);
        const dbGroupBookRef = firebase.firestore().collection('/groupBook');
        dbRef.get().then((res) => {
            if (res.exists) {
                const book = res.data();
                this.setState({
                    key: res.id,
                    id: book.id,
                    tytul: book.tytul,
                    data_wydania: book.data_wydania,
                    autor: book.autor,
                    ISBN: book.ISBN,
                    kod_kreskowy: book.kod_kreskowy,
                    zdjecieUrl: book.zdjecieUrl,
                    wydawnictwo: book.wydawnictwo,
                    status: book.status,
                    grupaKsiazekID: book.grupaKsiazekID,
                    isLoading: true
                });
            } else {
                console.log("Document does not exist!");
            }
        });
        this.unsubscribe = dbGroupBookRef.onSnapshot(this.getCollection);
    }
    getCollection = (querySnapshot) => {
        querySnapshot.forEach((res) => {

            const val = res.data();
            this.groupBookArr.push(val);
        });
        this.setState({
            groupBookArr: this.groupBookArr,
            isLoading: false,
        });
    };
    componentWillUnmount(){
        this.unsubscribe();
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    updateBook() {
        this.setState({
            isLoading: true,
        });
        const updateDBRef = firebase.firestore().collection('book').doc(this.state.key);
        updateDBRef.set({
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
        }).then((docRef) => {
            this.setState({
                key: '',
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
            this.props.navigation.navigate('BookScreen');
        })
            .catch((error) => {
                console.error("Error: ", error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    deleteBook() {
        const dbRef = firebase.firestore().collection('book').doc(this.props.route.params.bookKey);
        dbRef.delete().then((res) => {
            console.log('Item removed from database');
            this.props.navigation.navigate('BookScreen');
        })
    }

    openTwoButtonAlert=()=>{
        Alert.alert(
            'Usuwanie książki',
            'Jeteś pewny usunięcia książki?',
            [
                {text: 'Tak', onPress: () => this.deleteBook()},
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
                        placeholder={'Tytul'}
                        value={this.state.tytul}
                        onChangeText={(val) => this.inputValueUpdate(val, 'tytul')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Data Wydania'}
                        value={this.state.data_wydania}
                        onChangeText={(val) => this.inputValueUpdate(val, 'data_wydania')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Autor'}
                        value={this.state.autor}
                        onChangeText={(val) => this.inputValueUpdate(val, 'autor')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'ISBN'}
                        value={this.state.ISBN}
                        onChangeText={(val) => this.inputValueUpdate(val, 'ISBN')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Kod kreskowy'}
                        value={this.state.kod_kreskowy}
                        onChangeText={(val) => this.inputValueUpdate(val, 'kod_kreskowy')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Zdjęcie Url'}
                        value={this.state.zdjecieUrl}
                        onChangeText={(val) => this.inputValueUpdate(val, 'zdjecieUrl')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Wydawnictwo'}
                        value={this.state.wydawnictwo}
                        onChangeText={(val) => this.inputValueUpdate(val, 'wydawnictwo')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <RNPickerSelect
                        value={this.state.status}
                        placeholder={{label: 'Wybierz status', value: null}}
                        onValueChange={(value) => this.inputValueUpdate(value, 'status')}
                        items={[
                            {label:'posiadana', value:'posiadana'},
                            {label:'pożyczona od kogoś', value:'pożyczona od kogoś'},
                            {label:'pożyczona komuś', value:'pożyczona komuś'},
                            {label:'planowana do kupienia', value:'planowana do kupienia'}
                        ]}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <RNPickerSelect
                        value={this.state.grupaKsiazekID}
                        placeholder={{label: 'Wybierz grupę', value: null}}
                        onValueChange={(value) => this.inputValueUpdate(value, 'grupaKsiazekID')}
                        items={this.groupBookArr.map(val => {return {label: val.groupName, value: val.groupName}})
                        }
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Zapisz'
                        onPress={() => this.updateBook()}
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


export default BookDetailScreen;