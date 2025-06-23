import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './(tabs)/_layout';
import NewsDetail from './news/[id]';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ title: 'Detail Berita' }}
      />
    </Stack.Navigator>
  );
}
