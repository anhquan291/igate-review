import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// BottomTab
import BottomTab from './BottomTab';

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
};

export default Navigation;
