import { Text, Linking, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { COLORS } from '../constants';
import Animated from 'react-native-reanimated';
import NavBar from '../components/Navbar';

const Academics = ({ drawerAnimatedStyle }) => {
	return (
		<Container style={[drawerAnimatedStyle]}>
			<NavBar/>
			<Image
				source={require('../assets/images/coming_soon.png')}
				style={{ width: 250, height: 250, borderRadius: 10 }}
			/>
			<TouchableOpacity
				style={{
					marginVertical: 20,
					border: '2px solid black',
					borderRadius: 10,
					padding: 15,
					backgroundColor: COLORS.white2,
				}}
				onPress={() => {
					Linking.openURL(
						'https://iitj.ac.in/department/index.php?id=departments'
					);
				}}
			>
				<Text style={{ fontSize: 30 }}>Academics</Text>
			</TouchableOpacity>
		</Container>
	);
};

export default Academics;

//styles
const Container = styled(Animated.View)`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;
