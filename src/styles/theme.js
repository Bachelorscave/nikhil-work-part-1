import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#6155E9',
  secondary: '#434343',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#696969',
  lightGray: '#F5F5F5',
  error: '#FF0000',
  success: '#00FF00',
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Font sizes
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // App dimensions
  width,
  height,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontSize: SIZES.h4, lineHeight: 20 },
  body1: { fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontSize: SIZES.body4, lineHeight: 20 },
  body5: { fontSize: SIZES.body5, lineHeight: 18 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme; 