import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MediumText from '../Texts/MediumText';
import Colors from '../../Themes/Colors';
import Layout from '../../Themes/Layout';
import { kScaledSize, kSpacing } from '../../Utils/Constants';

type Props = {
  title: string;
  style?: ViewStyle;
  onPress: () => void | Promise<void>;
};

const IconButton = ({ title, style, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[Layout.rowCenter, styles.button, style]}
    >
      <MediumText numberOfLines={1} style={styles.title}>
        {title}
      </MediumText>
      <Icon
        name="reload"
        color={Colors.white}
        size={kScaledSize(20)}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: kSpacing.kSpacing7,
    paddingHorizontal: kSpacing.kSpacing15,
    borderRadius: 5,
  },
  title: {
    color: Colors.white,
  },
  icon: {
    marginLeft: kSpacing.kSpacing5,
  },
});
