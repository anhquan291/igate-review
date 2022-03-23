import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { kTextSizes } from '../../Utils/Constants';

const BoldText = (props: TextProps) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: kTextSizes.body,
    fontWeight: 'bold',
  },
});

export default BoldText;
