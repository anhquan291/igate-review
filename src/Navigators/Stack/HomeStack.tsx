import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../Screens/Home";
import DichvucongScreen from "../../Screens/Dichvucong";
import ThongtinScreen from "../../Screens/Thongtin";
import TracuuScreen from "../../Screens/Tracuu";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FileDetailScreen from "../../Screens/FileDetail";
// import UserScreen from "../../Screens/User";
//import RateScreen from "../../Screens/RateScreen";
import { RouteProp } from "@react-navigation/native";
import { FileFields } from "../../Models/File";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DichvucongStack from './DichvucongStack';
const Tab = createBottomTabNavigator();

export type HomeParamList = {
  UserScreen: undefined;
  HomeScreen: undefined;
  DichvuCongScreen: undefined;
  ThongtinScreen: undefined;
  TracuuScreen: undefined;
  FileDetailScreen: { item: FileFields };
  RatingScreen: { item: FileFields };
};

export type HomeRouteProps<RouteName extends keyof HomeParamList> = RouteProp<
  HomeParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<HomeParamList>();

const HomeStack = () => {
  return (
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="UserScreen" component={UserScreen} />
    //   <Stack.Screen name="HomeScreen" component={HomeScreen} />
    //   <Stack.Screen name="FileDetailScreen" component={FileDetailScreen} />
    //   <Stack.Screen name="RatingScreen" component={RateScreen} />
    // </Stack.Navigator>
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Thông tin" component={ThongtinScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Dịch vụ công" component={DichvucongStack} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Tra cứu" component={TracuuScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="file-search" color={color} size={26} />
        ),
      }} />

    </Tab.Navigator>

  );
};

export default HomeStack;
