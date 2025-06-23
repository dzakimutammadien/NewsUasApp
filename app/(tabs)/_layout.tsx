import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import Categories from './categories';
import Saved from './saved';
import Profile from './profile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
   <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ color, size }) => {
      let iconName = '';

      if (route.name === 'Home') {
        iconName = 'home-outline';
      } else if (route.name === 'Categories') {
        iconName = 'list-outline';
      } else if (route.name === 'Saved') {
        iconName = 'bookmark-outline';
      } else if (route.name === 'Profile') {
        iconName = 'person-outline';
      }

      return <Ionicons name={iconName as any} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#2980b9',
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen name="Home" component={Home} />
  <Tab.Screen name="Categories" component={Categories} />
  <Tab.Screen name="Saved" component={Saved} />
  <Tab.Screen name="Profile" component={Profile} />
</Tab.Navigator>

  );
}
