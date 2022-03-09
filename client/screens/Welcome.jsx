import styled, { useTheme } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, icons, SIZES } from '../constants';
import Constants from 'expo-constants';

const Welcome = ({ navigation }) => {
	const theme = useTheme();

	return (
		<Container>
			<OuterBox>
				<Circle>
					<Circle
						width={140}
						height={140}
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
					<ButtonContainer onPress={() => navigation.navigate('Register')}>
						<Label1>Sign In</Label1>
					</ButtonContainer>
					<ButtonContainer onPress={() => navigation.navigate('Register')}>
						<Label1>Register</Label1>
					</ButtonContainer>
				</Box>

				<Line />

				<Google onPress={() => navigation.navigate('Register')}>
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
	width: 100px;
	height: 100px;
`;

const WelcomeText = styled.Text`
	font-family: Poppins_400Regular;
	font-size: 50px;
	text-align: center;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.purple2 : COLORS.deepBlue};
	margin-top: 32px;
	margin-bottom: 8px;
`;

const WelcomeText2 = styled.Text`
	font-family: Poppins_400Regular;
	font-size: 16px;
	text-align: center;
	margin: 20px;
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
	width: 45%;
	border-radius: ${SIZES.padding}px;
	margin: 10px;
`;

const Label1 = styled.Text`
	color: ${(p) => COLORS.white1};
	padding: 10px;
	font-family: Poppins_400Regular;
	font-weight: 600;
	font-size: 20px;
	letter-spacing: 1.25px;
	text-align: center;
`;

const Line = styled.View`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.purple2 : COLORS.deepBlue};
	height: 1px;
	border-radius: 5px;
	width: 88%;
	margin: 32px 0;
`;

const Google = styled.TouchableOpacity`
	margin: 15px 0;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	padding: 8px;
`;

const Label2 = styled.Text`
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue)};
	font-family: Poppins_400Regular;
	font-size: 24px;
	text-align: center;
	margin-left: 15px;
`;
