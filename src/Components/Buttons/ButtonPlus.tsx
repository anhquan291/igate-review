import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Components
import { SemiBoldText } from '../texts';
// Theme
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
// Constants
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
  style?: ViewStyle;
  onPress: () => void;
}

const ButtonPlus = ({ style, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        style={[styles.container, Layout.center, style]}
        colors={[Colors.primary, Colors.green1]}
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}>
        <Entypo name="plus" color={Colors.white} size={kScaledSize(12)} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonPlus;

const styles = StyleSheet.create({
  container: {
    width: kSpacing.kSpacing16,
    height: kSpacing.kSpacing16,
    borderRadius: 20,
  },
});
