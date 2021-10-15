import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { styles } from './Style';
import { ListPage } from './Pages/ListPage';
import { AddPage } from './Pages/AddPage';
import { StudyPage } from './Pages/StudyPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "black" } }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StudyPage" component={StudyPage} />
          <Stack.Screen name="ListPage" component={ListPage} />
          <Stack.Screen name="AddPage" component={AddPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

registerRootComponent(App);
