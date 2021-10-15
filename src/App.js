import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './Style';
import { ListPage } from './Pages/ListPage';
import { AddPage } from './Pages/AddPage';
import { StudyPage as ReadyPage } from './Pages/ReadyPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabScreen = () => (
  <Tab.Navigator
    initialRouteName="ListPage"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "ReadyPage") {
          iconName = "school"
        } else if (route.name === "ListPage") {
          iconName = "format-list-bulleted"
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#777',
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopWidth: 0,
        backgroundColor: "#111",
      }
    })}
  >
    <Tab.Screen name="ReadyPage" component={ReadyPage} />
    <Tab.Screen name="ListPage" component={ListPage} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "black" } }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={TabScreen} />
          <Stack.Screen name="AddPage" component={AddPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

registerRootComponent(App);
