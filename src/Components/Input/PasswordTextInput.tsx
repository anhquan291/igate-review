import React, { useState } from 'react';
import {
  ViewStyle,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { useController, UseControllerProps } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Entypo';
import {
  FONT_FAMILY_REGULAR,
  kScaledSize,
  kSpacing,
  kTextSizes,
} from '../../Utils/Constants';
import RegularText from '../Texts/RegularText';
import Colors from '../../Themes/Colors';
import Layout from '../../Themes/Layout';

interface Props {
  controller: UseControllerProps;
  placeholder?: string;
  errorText?: string;
  style?: ViewStyle;
  inputProps?: TextInputProps;
}
const PasswordTextInput = ({
  controller,
  placeholder,
  style,
  errorText,
  inputProps,
}: Props) => {
  const { field } = useController({
    control: controller.control,
    rules: controller.rules,
    defaultValue: '',
    name: controller.name,
  });
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          Layout.rowHCenter,
          style,
          { borderColor: errorText ? Colors.error : Colors.grey6 },
        ]}
      >
        <TextInput
          style={[styles.input]}
          secureTextEntry={!isShow}
          value={field.value}
          onChangeText={field.onChange}
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor={Colors.holder}
          {...inputProps}
        />
        <TouchableOpacity onPress={() => setIsShow((prev) => !prev)}>
          <Icon
            name={isShow ? 'eye' : 'eye-with-line'}
            size={kScaledSize(20)}
            color={Colors.grey6}
          />
        </TouchableOpacity>
      </View>
      {errorText && <RegularText style={styles.error}>{errorText}</RegularText>}
    </View>
  );
};

export default PasswordTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: kSpacing.kSpacing18,
  },
  inputContainer: {
    height: kScaledSize(40),
    width: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: kSpacing.kSpacing10,
  },
  input: {
    flex: 1,
    fontSize: kTextSizes.body,
    padding: 0,
    margin: 0,
    color: Colors.black,
  },
  error: {
    marginTop: kSpacing.kSpacing10,
    color: Colors.error,
    fontSize: kTextSizes.xmini,
  },
});
