import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../Themes/Colors';
import Layout from '../../Themes/Layout';
import { kScaledSize, kSpacing } from '../../Utils/Constant';

type Props = {
  style?: ViewStyle;
  onPress: () => void | Promise<void>;
};

const ToTopButton = ({ style, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[Layout.center, styles.button, style]}
    >
      <Icon name="md-arrow-up" size={kScaledSize(20)} color={Colors.white} />
    </TouchableOpacity>
  );
};

export default ToTopButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    height: kScaledSize(36),
    width: kScaledSize(36),
    borderRadius: kScaledSize(18),
  },
  title: {
    color: Colors.white,
  },
});
