// App theme

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
	darkPurple: '#0E0B3A',
	darkgrey: '#080522',
	purple: '#B438BD',
	white1: '#FEFEFF',
	white3: '#e6e6e6',
	gray10: '#C4C4C4',
	gray1: '#8C8C8C',

	white2: '#F5F6FA',
	gray50: '#737373',
	deepBlue: '#233B7A',
	blue: '#2683F9',
	blue1: '#2683F9',

	gray20: '#F8F8F8',

	deepBlue1: '#103564',
	deepBlue2: '#2D2665',
	purple2: '#473ca8',

	white: '#FFFFFF',
	black: '#282A38',
	black1: '#000',

	pink: '#B438BD',
	pink1: '#F675FF',

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

// export const FONTS = {
// 	largeTitle: { fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle },
// 	h1: { fontFamily: 'Poppins-Black', fontSize: SIZES.h1, lineHeight: 36 },
// 	h2: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 30 },
// 	h3: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h3, lineHeight: 22 },
// 	h4: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h4, lineHeight: 22 },
// 	h5: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h5, lineHeight: 22 },
// 	body1: {
// 		fontFamily: 'Poppins-Regular',
// 		fontSize: SIZES.body1,
// 		lineHeight: 36,
// 	},
// 	body2: {
// 		fontFamily: 'Poppins-Regular',
// 		fontSize: SIZES.body2,
// 		lineHeight: 30,
// 	},
// 	body3: {
// 		fontFamily: 'Poppins-Regular',
// 		fontSize: SIZES.body3,
// 		lineHeight: 22,
// 	},
// 	body4: {
// 		fontFamily: 'Poppins-Regular',
// 		fontSize: SIZES.body4,
// 		lineHeight: 22,
// 	},
// 	body5: {
// 		fontFamily: 'Poppins-Regular',
// 		fontSize: SIZES.body5,
// 		lineHeight: 22,
// 	},
// };

export const darkTheme = {
	name: 'dark',
	backgroundColor1: COLORS.darkPurple,
	backgroundColor2: COLORS.darkgrey,
	backgroundColor3: COLORS.purple,
	backgroundColor4: COLORS.gray10,
	textColor: COLORS.white1,
	tintColor: COLORS.white1,
};

export const lightTheme = {
	name: 'light',
	backgroundColor1: COLORS.white2,
	backgroundColor2: COLORS.deepBlue,
	backgroundColor3: COLORS.white1,
	backgroundColor4: COLORS.blue,
	textColor: COLORS.black,
	tintColor: COLORS.black,
};

export const selectedTheme = darkTheme;

const appTheme = { COLORS, SIZES, darkTheme, lightTheme };

export default appTheme;
