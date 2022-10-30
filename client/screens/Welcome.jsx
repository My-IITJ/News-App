/* eslint-disable no-unused-vars */
import styled, { useTheme } from 'styled-components/native';
import { COLORS, icons, isSmall, SIZES } from '../constants';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/userSlice';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

//auth related imports
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { onGoogleButtonPress } from '../firebase';

WebBrowser.maybeCompleteAuthSession();

const Welcome = ({ navigation }) => {
	const theme = useTheme();
	const dispatch = useDispatch();

	const handleRedirect = async (e) => {
		let {
			queryParams: { data },
		} = Linking.parse(e.url);
		data = JSON.parse(data);
		console.log(data);
		dispatch(updateData({ data }));
	};

	const addLinkingListener = () => {
		Linking.addEventListener('url', handleRedirect);
	};
	const removeLinkingListener = () => {
		Linking.removeEventListener('url', handleRedirect);
	};

	const handleLogin = async () => {
		let authUrl = `https://myiitj-api.vercel.app/auth/google`;
		try {
			addLinkingListener();
			await WebBrowser.openAuthSessionAsync(authUrl);
		} catch (err) {
			console.log(err);
		}
		removeLinkingListener();
	};

	useEffect(() => {
		WebBrowser.warmUpAsync();
		return () => {
			WebBrowser.coolDownAsync();
		};
	}, []);

	return (
		<Container>
			<OuterBox>
				<Circle>
						<Avatar
							source={
								theme.name === 'dark' ? icons.logo_bg_dark : icons.logo_bg_light
							}
						/>
				</Circle>

				<WelcomeText>Welcome to My IITJ</WelcomeText>
				<WelcomeText2>
					A social interaction app for the IIT Jodhpur community
				</WelcomeText2>

				<Box>
					<ButtonContainer onPress={() => navigation.navigate('SignIn')}>
						<Label1>Sign In</Label1>
					</ButtonContainer>
					<ButtonContainer onPress={() => navigation.navigate('Register')}>
						<Label1>Register</Label1>
					</ButtonContainer>
				</Box>

				<Line />
				<GoogleSigninButton
				style={{ width: RFValue(200), height: RFValue(48) }}
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={onGoogleButtonPress}
				/>
				
			</OuterBox>
		</Container>
	);
};

export default Welcome;

const Container = styled.View`
	flex: 1;
	padding: 15px;
	padding-top: ${Constants.statusBarHeight + 10}px;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white2};
`;

const OuterBox = styled.View`
	padding: 50px;
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkgrey : COLORS.white1};
	border-radius: ${SIZES.radius}px;
	shadow-color: ${(p) => COLORS.deepBlue};
	shadow-opacity: 1.5;
	shadow-radius: 20px;
	elevation: 20;
`;

const Circle = styled.View`
	align-items: center;
	justify-content: center;
	width: ${RFPercentage(30)}px;
	height: ${RFPercentage(30)}px;
	border-radius: ${RFPercentage(20)}px;
	background-color: ${({ theme, color }) =>
		theme.name === 'dark' ? color || COLORS.darkgrey : COLORS.white1};
	shadow-color: ${(p) => COLORS.deepBlue};
	shadow-opacity: 1.5;
	shadow-radius: 20px;
	elevation: 20;
`;

const Avatar = styled.Image`
	width: ${RFValue(130)}px;
	height: ${RFValue(130)}px;
`;

const WelcomeText = styled.Text`
	font-family: Poppins_400Regular;
	font-weight: bold;
	font-size: ${RFValue(25)}px;
	text-align: center;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.purple2 : COLORS.deepBlue};
	margin-top: ${RFValue(30)}px;
	margin-bottom: 8px;
`;

const WelcomeText2 = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${RFValue(14)}px;
	text-align: center;
	margin: ${RFValue(10)}px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue};
`;

const Box = styled.View`
	flex-direction: row;
	align-items: center;
`;

const ButtonContainer = styled.TouchableOpacity`
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.purple2 : COLORS.deepBlue};
	width: ${RFValue(120)}}px;
	border-radius: ${SIZES.padding}px;
	margin: 10px;
`;

const Label1 = styled.Text`
	color: ${(p) => COLORS.white1};
	padding: 10px;
	font-family: Poppins_400Regular;
	font-weight: 600;
	font-size: ${RFValue(15)}px;
	letter-spacing: 1.25px;
	text-align: center;
`;

const Line = styled.View`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.purple2 : COLORS.deepBlue};
	height: 1px;
	border-radius: 5px;
	width: 88%;
	margin: ${isSmall ? 18 : 32}px 0;
`;
