import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Style';
import { AppContext } from './AppContext';
import { ListPage } from './Pages/ListPage';
import { AddPage } from './Pages/AddPage';
import { ReadyPage } from './Pages/ReadyPage';
import { StudyPage } from './Pages/StudyPage';
import { STORAGE_KEY_CARDS } from './Constants';

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
  const [cards, setCards] = useState({});
  const [loading, setLoading] = useState(true);
  const addCard = async (card) => {
    const newCards = { ...cards, [Date.now()]: { ...card } }
    try {
      await AsyncStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(newCards));
      setCards(newCards);
    } catch { return false; }
    return true;
  }
  const modifyCard = async (id, card) => {
    const newCards = { ...cards, [id]: { ...card } }
    try {
      await AsyncStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(newCards));
      setCards(newCards);
    } catch { return false; }
    return true;
  }
  const deleteCard = async (id) => {
    const newCards = { ...cards };
    try {
      delete newCards[id];
      await AsyncStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(newCards));
      setCards(newCards);
    } catch { return false; }
    return true;
  }
  const loadCards = async () => {
    const cards = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY_CARDS));
    if (cards) {
      setCards(cards);
    }
    setLoading(false);
  };
  const cardsUtil = {
    cards: { ...cards },
    addCard: addCard,
    modifyCard: modifyCard,
    deleteCard: deleteCard,
  }
  useEffect(() => { loadCards() }, [])
  return (
    <View style={styles.container}>
      {!loading ? (
        <AppContext.Provider value={cardsUtil}>
          <StatusBar style="light" />
          <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "black" } }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={TabScreen} />
              <Stack.Screen name="AddPage" component={AddPage} />
              <Stack.Screen name="StudyPage" component={StudyPage} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContext.Provider>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
}

registerRootComponent(App);
