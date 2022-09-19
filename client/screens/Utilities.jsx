import { Text, Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { COLORS } from '../constants';
import Animated from 'react-native-reanimated';

const Utilities = ({ drawerAnimatedStyle }) => {
	return (
		<Container style={[drawerAnimatedStyle]}>
			<Image
				style={{ width: 300, height: 300 }}
				source={require('../assets/images/coming_soon.png')}
			/>
			<Text
				style={{
					fontSize: 30,
					marginVertical: 20,
				}}
			>
				Coming Soon...
			</Text>
		</Container>
	);
};

export default Utilities;

//styles
const Container = styled(Animated.View)`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;
