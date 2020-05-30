import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import AddBookScreen from './screens/AddBookScreen';
import BookScreen from './screens/BookScreen';
import BookDetailScreen from './screens/BookDetailScreen';

import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}


const Stack = createStackNavigator();

function MyStack() {
  return (
      <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#621FF7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
      >
          <Stack.Screen
              name="BookScreen"
              component={BookScreen}
              options={{ title: 'Lista książek' }}
          />
        <Stack.Screen
            name="AddBookScreen"
            component={AddBookScreen}
            options={{ title: 'Dodaj Książkę' }}
        />
        <Stack.Screen
            name="BookDetailScreen"
            component={BookDetailScreen}
            options={{ title: 'Szczegóły ksiązki' }}
        />
      </Stack.Navigator>
  );
}

export default function App() {
  return (
          <NavigationContainer>
              <MyStack />
          </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
