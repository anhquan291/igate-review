import { Dimensions, Platform } from 'react-native';
import { hasNotch } from './Common';

export const kStandarWidth = 375;
export const kStandarHeight = 812;
export const kHeight = Dimensions.get('window').height;
export const kWidth = Dimensions.get('window').width;

const scale = Math.min(kWidth / kStandarWidth, kHeight / kStandarHeight);

export const kScaledSize = (size: number) => Math.ceil(size * scale);

export const kTextSizes = {
  xxmini: kScaledSize(8),
  xmini: kScaledSize(10),
  mini: kScaledSize(12),
  small: kScaledSize(13),
  middle: kScaledSize(14),
  body: kScaledSize(15),
  medium: kScaledSize(16),
  large: kScaledSize(18),
  xlarge: kScaledSize(24),
};

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'Archivo-Regular';
export const FONT_FAMILY_LIGHT = 'Archivo-Light';
export const FONT_FAMILY_BOLD = 'Archivo-Bold';
export const FONT_FAMILY_MEDIUM = 'Archivo-Medium';
export const FONT_FAMILY_SEMIBOLD = 'Archivo-SemiBold';
export const FONT_FAMILY_ITALIC = 'Archivo-Italic';

// SPACING
export const kSpacing = {
  kSpacing1: kScaledSize(1),
  kSpacing2: kScaledSize(2),
  kSpacing3: kScaledSize(3),
  kSpacing4: kScaledSize(4),
  kSpacing5: kScaledSize(5),
  kSpacing6: kScaledSize(6),
  kSpacing7: kScaledSize(7),
  kSpacing8: kScaledSize(8),
  kSpacing9: kScaledSize(9),
  kSpacing10: kScaledSize(10),
  kSpacing11: kScaledSize(11),
  kSpacing12: kScaledSize(12),
  kSpacing13: kScaledSize(13),
  kSpacing14: kScaledSize(14),
  kSpacing15: kScaledSize(15),
  kSpacing16: kScaledSize(16),
  kSpacing17: kScaledSize(17),
  kSpacing18: kScaledSize(18),
  kSpacing19: kScaledSize(19),
  kSpacing20: kScaledSize(20),
};

// Header
export const kHeaderHeight = hasNotch()
  ? kScaledSize(88)
  : Platform.OS === 'ios'
    ? kScaledSize(75)
    : kScaledSize(50);
