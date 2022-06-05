import React from "react";
import { StyleSheet, View, TouchableOpacity, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackActions } from "@react-navigation/native";
// Theme
import Colors from "../../Themes/Colors";
import Layout from "../../Themes/Layout";
// Icons
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// Constants
import { kHeaderHeight, kScaledSize, kSpacing } from "../../Utils/Constants";
import { SemiBoldText } from "../Texts";

interface Props {
  name?: string;
  style?: ViewStyle;
  textStyle?: any;
  iconColor?: string;
  backToTopStack?: string;
  showBackButton?: boolean;
  logout?: boolean;
  onLogout?: () => void;
}

const Header = ({
  name,
  style,
  textStyle,
  iconColor,
  backToTopStack,
  showBackButton,
  logout,
  onLogout,
}: Props) => {
  const navigation = useNavigation<any>();
  const onPress = (): void => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container, Layout.row, style]}>
      {(showBackButton || showBackButton === undefined) && (
        <TouchableOpacity style={[styles.icon]} onPress={onPress}>
          <Feather
            name="arrow-left"
            size={kScaledSize(20)}
            color={iconColor || Colors.white}
          />
        </TouchableOpacity>
      )}
      {logout && <View style={{ width: kScaledSize(25) }} />}
      {name && (
        <SemiBoldText style={[styles.text, textStyle]} numberOfLines={1}>
          {name}
        </SemiBoldText>
      )}
      {(showBackButton || showBackButton === undefined) && (
        <View style={{ width: kScaledSize(25) }} />
      )}
      {logout && (
        <TouchableOpacity onPress={onLogout}>
          <MaterialIcons name="logout" color={"white"} size={kScaledSize(25)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: kHeaderHeight,
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: Colors.primary,
    paddingBottom: kScaledSize(10),
    paddingHorizontal: kScaledSize(16),
  },
  icon: {
    width: kScaledSize(30),
    height: kScaledSize(30),
    justifyContent: "flex-end",
  },
  text: {
    flex: 1,
    color: Colors.white,
    marginBottom: kSpacing.kSpacing1,
    marginHorizontal: 5,
    textAlign: "center",
  },
});
