import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { COLORS } from '../constants';
import { Image, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

const Event = ({ drawerAnimatedStyle }) => {
	return (
		<Container
			style={[drawerAnimatedStyle]}
			onPress={() => {
				Linking.openURL(
					'https://iitj.webex.com/iitj/j.php?MTID=m0eb6745f8ed93a359cc02992b0ba658d'
				);
			}}
		>
			<Box>
				<Text>Live</Text>
				<Entypo name="dot-single" size={20} color="red" />
			</Box>
			<Image
				source={require('../assets/images/event.jpeg')}
				style={{
					width: '100%',
					height: '100%',
				}}
				resizeMode="contain"
			/>
		</Container>
	);
};

export default Event;

//styles
const Container = styled(Animated.View)`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;

const Box = styled.View`
	position: absolute;
	color: red;
	top: 100px;
	right: 50px;
	font-size: 20px;
	border: 1px solid red;
	border-radius: 15px;
	padding: 8px 15px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const Text = styled.Text`
	color: red;
	font-size: 18px;
`;
