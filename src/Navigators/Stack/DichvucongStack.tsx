import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DichvucongScreen from '../../Screens/Dichvucong';
import ThutucChiTietScreen from '../../Screens/ThutucChiTiet';
import MotaThuTucScreen from '../../Screens/MotaThuTuc';
import DinhkemThutucScreen from '../../Screens/DinhkemThuTuc';

interface Props { }

const Stack = createNativeStackNavigator();

const DichvucongStack = (props: Props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DichvuCongScreen" component={DichvucongScreen} />
      <Stack.Screen name="ThutucChiTietScreen" component={ThutucChiTietScreen} />
      <Stack.Screen name="MotaThuTucScreen" component={MotaThuTucScreen} />
      <Stack.Screen name="DinhkemThutucScreen" component={DinhkemThutucScreen} />
    </Stack.Navigator>
  );
};

export default DichvucongStack;
