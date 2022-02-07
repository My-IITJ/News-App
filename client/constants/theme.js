// This is an example. we will edit the same for our app.

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
	primary: '#42C6A5', // Green
	primary2: '#FBB344', // Orange
	primary3: '#33354E', // Dark Blue
	secondary: '#FC2626', // Red
	gray10: '#E5E5E5',
	gray20: '#CCCCCC',
	gray30: '#A1A1A1',
	gray40: '#999999',
	gray50: '#7F7F7F',
	gray60: '#666666',
	gray70: '#4C4C4C',
	gray80: '#333333',
	gray85: '#242526',
	gray90: '#191919',

	additionalColor4: '#C3C3C3',
	additionalColor9: '#F3F3F3',
	additionalColor11: '#F0FFFB',
	additionalColor13: '#EBF3EF',

	white: '#FFFFFF',
	black: '#000000',

	transparent: 'transparent',
	transparentWhite1: 'rgba(255, 255, 255, 0.1)',
	transparentBlack1: 'rgba(0, 0, 0, 0.1)',
	transparentBlack7: 'rgba(0, 0, 0, 0.7)',
};

export const SIZES = {
	// global sizes
	base: 8,
	font: 14,
	radius: 12,
	padding: 24,

	// font sizes
	largeTitle: 40,
	h1: 30,
	h2: 22,
	h3: 16,
	h4: 14,
	h5: 12,
	body1: 30,
	body2: 22,
	body3: 16,
	body4: 14,
	body5: 12,

	// app dimensions
	width,
	height,
};

export const FONTS = {
	largeTitle: { fontFamily: 'Roboto-Black', fontSize: SIZES.largeTitle },
	h1: { fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36 },
	h2: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30 },
	h3: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22 },
	h4: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22 },
	h5: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h5, lineHeight: 22 },
	body1: {
		fontFamily: 'Roboto-Regular',
		fontSize: SIZES.body1,
		lineHeight: 36,
	},
	body2: {
		fontFamily: 'Roboto-Regular',
		fontSize: SIZES.body2,
		lineHeight: 30,
	},
	body3: {
		fontFamily: 'Roboto-Regular',
		fontSize: SIZES.body3,
		lineHeight: 22,
	},
	body4: {
		fontFamily: 'Roboto-Regular',
		fontSize: SIZES.body4,
		lineHeight: 22,
	},
	body5: {
		fontFamily: 'Roboto-Regular',
		fontSize: SIZES.body5,
		lineHeight: 22,
	},
};

export const darkTheme = {
	name: 'dark',
	backgroundColor1: COLORS.gray85,
	backgroundColor2: COLORS.gray90,
	backgroundColor3: COLORS.gray90,
	backgroundColor4: COLORS.primary,
	textColor: COLORS.white,
	textColor2: COLORS.white,
	tintColor: COLORS.white,
};

export const lightTheme = {
	name: 'light',
	backgroundColor1: COLORS.white,
	backgroundColor2: COLORS.primary3,
	backgroundColor3: COLORS.additionalColor11,
	backgroundColor4: COLORS.white,
	textColor: COLORS.black,
	textColor2: COLORS.primary,
	tintColor: COLORS.black,
};

export const selectedTheme = lightTheme;

const appTheme = { COLORS, SIZES, FONTS, darkTheme, lightTheme };

export default appTheme;
