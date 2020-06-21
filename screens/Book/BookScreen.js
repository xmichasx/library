import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import {Button, ListItem} from 'react-native-elements'
import firebase from '../../database/firebaseDb';

class BookScreen extends Component {
    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('book');
        this.state = {
            isLoading: true,
            bookArr: []
        };
    }
    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }
    getCollection = (querySnapshot) => {
        const bookArr = [];
        querySnapshot.forEach((res) => {
            const val = res.data();
            bookArr.push({
                key: res.id,
                res,
                val
            });
        });
        this.setState({
            bookArr,
            isLoading: false,
        });
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
                <Button
                    title="Dodaj Książkę"
                    onPress={() => this.props.navigation.navigate('AddBookScreen')}
                />
                <Button
                    title="Grupy Książek"
                    onPress={() => this.props.navigation.navigate('GroupBookScreen')}
                />
                <Button
                    title="Skanuj kod kreskowy"
                    onPress={() => this.props.navigation.navigate('ScannerScreen')}
                />
                {
                    this.state.bookArr.map((item, i) => {
                        return (
                            <ListItem
                                key={i}
                                chevron
                                bottomDivider
                                title={item.val.tytul}
                                onPress={() => {
                                    this.props.navigation.navigate('BookDetailScreen', {
                                        bookKey: item.key
                                    });
                                }}/>
                        );
                    })
                }
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
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
});
export default BookScreen;