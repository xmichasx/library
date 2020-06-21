import React, {Component} from "react";
import firebase from "../../database/firebaseDb";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {Button, ListItem} from "react-native-elements";

class GroupBookScreen extends Component{
    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('groupBook');
        this.state = {
            isLoading: true,
            groupBookArr: []
        };
    }
    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }
    getCollection = (querySnapshot) => {
        const groupBookArr = [];
        querySnapshot.forEach((res) => {
            const val = res.data();
            groupBookArr.push({
                key: res.id,
                res,
                val
            });
        });
        this.setState({
            groupBookArr: groupBookArr,
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
                    title="Dodaj Grupe"
                    onPress={() => this.props.navigation.navigate('AddGroupBookScreen')}
                />
                {
                    this.state.groupBookArr.map((item, i) => {
                        return (
                            <ListItem
                                key={i}
                                chevron
                                bottomDivider
                                title={item.val.groupName}
                                onPress={() => {
                                    this.props.navigation.navigate('GroupBookDetailScreen', {
                                        groupBookKey: item.key
                                    });
                                }}
                                />
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
export default GroupBookScreen;