import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button} from "react-native-elements";

class DecodeScreen extends Component{
    
    render()
    {
        return(
        <View>
            <Text>{this.props.route.params.data}</Text>
            <Button
                    title="Zeskanuj ponownie"
                    onPress={() => this.props.navigation.navigate('ScannerScreen')}
                />
            <Button
                    title="Sprawdź dostępność książki w bazie"
                    onPress={() => this.props.navigation.navigate('OpenLibraryIntegratorScreen')}
                />
        </View>
        )
    }
}


export default DecodeScreen;