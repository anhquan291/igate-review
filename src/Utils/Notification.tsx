import { Alert } from 'react-native';

export type AlertProps = {
  message: string;
  buttonText1?: string;
  buttonText2?: string;
  onPress1?: () => Promise<void> | void;
  onPress2?: () => Promise<void> | void;
};
export const handleAlert = ({
  message,
  buttonText1,
  buttonText2,
  onPress1,
  onPress2,
}: AlertProps) => {
  if (buttonText2 !== undefined) {
    return Alert.alert('Thông báo', message !== '' ? message : '', [
      {
        text: buttonText2,
        onPress: onPress2,
      },
      {
        text: buttonText1 !== undefined ? buttonText1 : 'Đồng ý',
        onPress: onPress1,
      },
    ]);
  }
  return Alert.alert('Thông báo', message !== '' ? message : '', [
    {
      text: buttonText1 !== undefined ? buttonText1 : 'Đồng ý',
      onPress: onPress1,
    },
  ]);
};
