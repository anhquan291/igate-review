import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// Navigation
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
// BottomTab
import { HomeStack, LoginStack } from './Stack';
import { useAppSelector } from '../Hooks/RTKHooks';

export type RootStackParamList = {
  HomeStack: undefined;
  LoginStack: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const AppStack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.auth);
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        {!isLogin ? (
          <AppStack.Screen name="LoginStack" component={LoginStack} />
        ) : (
          <AppStack.Screen name="HomeStack" component={HomeStack} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
