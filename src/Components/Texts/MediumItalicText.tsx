import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { kTextSizes } from '../../Utils/Constants';

const MediumItalicText = (props: TextProps) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: kTextSizes.body,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default MediumItalicText;
