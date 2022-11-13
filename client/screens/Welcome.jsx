/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {Alert} from 'react-native'
import styled, { useTheme } from 'styled-components/native';
import { COLORS, icons, isSmall, SIZES } from '../constants';
import Constants from 'expo-constants';
import * as Sentry from "@sentry/react-native";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

//auth related imports
import { ActivityIndicator } from 'react-native-paper';


// import statusCodes along with GoogleSignin
const APP_TYPE = process.env.APP_TYPE;

const getWebClientId = () => {
	switch (APP_TYPE) {
		case 'dev':
			return '379614937476-76bdg50kjohnd7qni3o7odrpf46si1td.apps.googleusercontent.com';
		case 'preview':
			return '696540223154-md2pnvl7eegrgb68qle3ea447noqu76d.apps.googleusercontent.com';
		default:
			return '379614937476-76bdg50kjohnd7qni3o7odrpf46si1td.apps.googleusercontent.com';
	}
};

GoogleSignin.configure({
	webClientId: getWebClientId(),
	scopes: ['profile', 'email'],
});

// Somewhere in your code

const Welcome = ({ navigation }) => {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);

	const signIn = async () => {
		try {
		  setLoading(true);
		  await GoogleSignin.hasPlayServices();
		  // Get the users ID token
		  const { idToken } = await GoogleSignin.signIn();
		  // Create a Google credential with the token
		  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		  // Sign-in the user with the credential
		  auth().signInWithCredential(googleCredential);
		  setLoading(false);
		} catch (error) {
			setLoading(false);
			if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			Alert.alert("Google Play Services not available");
		  } else {
			console.error(error)
			Alert.alert("Something went wrong");
			// report to sentry
			Sentry.captureException(error);
		}
		}
	  };

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
				onPress={signIn}
				/>
				{loading && <ActivityIndicator/>}
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
