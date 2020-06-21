import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import AddBookScreen from './screens/Book/AddBookScreen';
import BookScreen from './screens/Book/BookScreen';
import BookDetailScreen from './screens/Book/BookDetailScreen';
import GroupBookScreen from './screens/groupBook/GroupBookScreen';

import {decode, encode} from 'base-64'
import GroupBookDetailScreen from "./screens/groupBook/GroupBookDetailScreen";
import AddGroupBookScreen from "./screens/groupBook/AddGroupBookScreen";
import ScannerScreen from "./screens/Scanner/ScannerScren";
import DecodeScreen from "./screens/Scanner/DecodeScreen"
import OpenLibraryIntegratorScreen from "./screens/Scanner/OpenLibraryIntegratorScreen";

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
              options={{ title: 'Lista Książek' }}
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
          <Stack.Screen
              name="GroupBookScreen"
              component={GroupBookScreen}
              options={{ title: 'Grupy książek' }}
          />
          <Stack.Screen
              name="GroupBookDetailScreen"
              component={GroupBookDetailScreen}
              options={{ title: 'Szczegóły książki' }}
          />
          <Stack.Screen
              name="AddGroupBookScreen"
              component={AddGroupBookScreen}
              options={{ title: 'Dodaj grupę' }}
          />
          <Stack.Screen
              name="ScannerScreen"
              component={ScannerScreen}
              options={{ title: 'Skanuj Kod Kreskowy' }}
          />
          <Stack.Screen
              name="DecodeScreen"
              component={DecodeScreen}
              options={{ title: 'Dekoder' }}
          />
          <Stack.Screen
              name="OpenLibraryIntegratorScreen"
              component={OpenLibraryIntegratorScreen}
              options={{ title: 'Open Library Integrator' }}
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
