import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../Screens/Home";
import FileDetailScreen from "../../Screens/FileDetail";
import UserScreen from "../../Screens/User";
import { RouteProp } from "@react-navigation/native";
import { FileFields } from "../../Models/File";
import RateScreen from "../../Screens/RateScreen";

export type HomeParamList = {
  UserScreen: { item?: FileFields };
  HomeScreen: undefined;
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
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FileDetailScreen" component={FileDetailScreen} />
      <Stack.Screen name="RatingScreen" component={RateScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
