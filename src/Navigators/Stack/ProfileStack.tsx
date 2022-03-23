import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../../Screens/Profile';

interface Props {}

const Stack = createNativeStackNavigator();

const HomeStack = (props: Props) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
