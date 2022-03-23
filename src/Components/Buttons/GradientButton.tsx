import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Components
import { SemiBoldText } from '../Texts';
// Theme
import Colors from '../../Themes/Colors';
import Layout from '../../Themes/Layout';
// Constants
import { kScaledSize, kSpacing, kTextSizes } from '../../Utils/Constants';

interface Props {
  style?: ViewStyle;
  onPress: () => void;
  label: string;
  isDisable?: boolean;
}

const GradientButton = ({
  style,
  onPress,
  label,
  isDisable = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isDisable}
    >
      <LinearGradient
        style={[styles.container, Layout.center, style]}
        colors={[
          isDisable ? Colors.grey7 : Colors.primary,
          isDisable ? Colors.grey7 : Colors.green1,
        ]}
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
      >
        <SemiBoldText
          numberOfLines={1}
          style={[
            styles.text,
            { color: isDisable ? Colors.grey6 : Colors.white },
          ]}
        >
          {label}
        </SemiBoldText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: kSpacing.kSpacing11,
    width: '100%',
    borderRadius: 5,
  },
  text: {
    fontSize: kTextSizes.medium,
  },
});
