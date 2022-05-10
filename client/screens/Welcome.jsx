import styled, { useTheme } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, icons, isSmall, SIZES } from '../constants';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/userSlice';

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
				<Circle width={isSmall && 180} height={isSmall && 180}>
					<Circle
						width={isSmall ? 120 : 140}
						height={isSmall ? 120 : 140}
						color={COLORS.purple2}
						style={{ opacity: 0.5 }}
					>
						<Avatar
							source={
								theme.name === 'dark' ? icons.logo_bg_dark : icons.logo_bg_light
							}
						/>
					</Circle>
				</Circle>

				<WelcomeText>Welcome to My IITJ</WelcomeText>
				<WelcomeText2>
					lorem ipsum dolor sit aminlorem ipsum dolor sit aminlorem ipsum dolor
					sit aminlorem ipsum dolor sit
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

				<Google onPress={onGoogleButtonPress}>
					<Circle
						width={60}
						height={60}
						color={COLORS.purple2}
						style={{ opacity: 0.5 }}
					>
						<AntDesign
							name="google"
							size={40}
							color={theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue}
							style={{ opacity: 0.7 }}
						/>
					</Circle>
					<Label2>Continue with Google</Label2>
				</Google>
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
	padding: 25px;
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
	width: ${(p) => p.width || 200}px;
	height: ${(p) => p.height || 200}px;
	border-radius: 100px;
	background-color: ${({ theme, color }) =>
		theme.name === 'dark' ? color || COLORS.darkgrey : COLORS.white1};
	shadow-color: ${(p) => COLORS.deepBlue};
	shadow-opacity: 1.5;
	shadow-radius: 20px;
	elevation: 20;
`;

const Avatar = styled.Image`
	width: ${isSmall ? 80 : 100}px;
	height: ${isSmall ? 80 : 100}px;
`;

const WelcomeText = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${isSmall ? 40 : 50}px;
	text-align: center;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.purple2 : COLORS.deepBlue};
	margin-top: ${isSmall ? 22 : 32}px;
	margin-bottom: 8px;
`;

const WelcomeText2 = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${isSmall ? 14 : 16}px;
	text-align: center;
	margin: ${isSmall ? 10 : 20}px;
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
	width: ${isSmall ? 38 : 45}%;
	border-radius: ${SIZES.padding}px;
	margin: 10px;
`;

const Label1 = styled.Text`
	color: ${(p) => COLORS.white1};
	padding: 10px;
	font-family: Poppins_400Regular;
	font-weight: 600;
	font-size: ${isSmall ? 16 : 20}px;
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

const Google = styled.TouchableOpacity`
	margin: ${isSmall ? 8 : 15}px 0;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	padding: 8px;
`;

const Label2 = styled.Text`
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue)};
	font-family: Poppins_400Regular;
	font-size: ${isSmall ? 18 : 24}px;
	text-align: center;
	margin-left: 15px;
`;
