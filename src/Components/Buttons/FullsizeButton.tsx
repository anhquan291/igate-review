import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { kScaledSize, kSpacing, kTextSizes } from '../../Utils/Constants';
import { SemiBoldText } from '../Texts';
import Colors from '../../Themes/Colors';
import Layout from '../../Themes/Layout';

interface Props {
  style?: ViewStyle;
  onPress: () => void;
  label: string;
}

const FullsizeButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.8}
      style={[styles.container, Layout.center, props.style]}
    >
      <SemiBoldText numberOfLines={1} style={styles.text}>
        {props.label}
      </SemiBoldText>
    </TouchableOpacity>
  );
};

export default FullsizeButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: kSpacing.kSpacing11,
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  text: {
    fontSize: kTextSizes.medium,
    color: Colors.white,
  },
});
