import React, { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { TextInput, StyleSheet, View, ViewStyle } from 'react-native';
import Colors from '../../Themes/Colors';
import Layout from '../../Themes/Layout';
import { kScaledSize, kSpacing } from '../../utils/Constants';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface Props {
  placeholder?: string;
  style?: ViewStyle;
}

const SearchTextInput = ({ placeholder, style }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, style]}>
        <View style={styles.icon}>
          <Fontisto name="search" color={Colors.grey6} size={20} />
        </View>

        <TextInput
          style={[styles.input]}
          placeholder="Search"
          placeholderTextColor={Colors.grey6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    // textAlign: 'left',
    // backgroundColor: 'blue',
    width: '100%',
    height: kScaledSize(36),
    padding: 0,
    margin: 0,
    fontSize: kScaledSize(16),
  },
  container: {
    margin: kSpacing.kSpacing18,
  },
  inputContainer: {
    // width: '100%',
    paddingHorizontal: kSpacing.kSpacing10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.grey8,
  },
  icon: {
    marginLeft: 15,
    marginRight: 5,
  },
});

export default SearchTextInput;
