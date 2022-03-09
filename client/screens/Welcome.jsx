import styled, { useTheme } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { view, TouchableOpacity } from "react-native";
const Welcome = () => {
	const theme = useTheme();
	return (
		<Container>
			<OuterBox>
				<Circle1>
					<Circle2>
						<Avatar source={require("../assets/images/iitj.jpg")} />
					</Circle2>
				</Circle1>
				<WelcomeText>Welcome to My IITJ</WelcomeText>
				<WelcomeText2>
					lorem ipsum dolor sit aminlorem ipsum dolor sit aminlorem ipsum dolor
					sit aminlorem ipsum dolor sit
				</WelcomeText2>
				<ButtonView>
					<ButtonContainer
					// onPress={props.onPress}
					>
						<Label1>Sign In</Label1>
					</ButtonContainer>
					<ButtonContainer
					// onPress={props.onPress}
					>
						<Label1>Register</Label1>
					</ButtonContainer>
				</ButtonView>
				<Line> ─────────────────────</Line>

				<ButtonGoogle
				// onPress={props.onPress}
				>
					<Label2>
						<AntDesign name="google" size={24} color="white" /> Continue with
						Google
					</Label2>
				</ButtonGoogle>
			</OuterBox>
		</Container>
	);
};

export default Welcome;

const Container = styled.View`
	padding: 3% 3%;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.darkPurple : COLORS.white};
`;
const OuterBox = styled.View`
	padding-top: 5%;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.darkgrey : COLORS.white2};
	border-radius: 10px;
	shadow-color: #233b7a;
	shadow-opacity: 1.5;
	shadow-radius: 20px;
	elevation: 20;
`;

const Line = styled.Text`
	color: #233b7a;
`;

const Circle1 = styled.View`
	align-items: center;
	justify-content: center;
	width: 260px;
	height: 260px;
	border-radius: 130px;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.darkgrey : COLORS.white};
	shadow-color: #233b7a;
	shadow-opacity: 1.5;
	shadow-radius: 20px;
	elevation: 20;
`;
const Circle2 = styled.View`
	align-items: center;
	justify-content: center;
	width: 175px;
	height: 175px;
	border-radius: 87.5px;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.darkgrey : COLORS.white};
	shadow-color: #233b7a;
	shadow-opacity: 1.5;
	shadow-radius: 20px;
	elevation: 20;
`;
const Avatar = styled.Image`
	width: 113.92px;
	height: 111px;
`;

const WelcomeText = styled.Text`
	font-family: "Poppins-Regular";
	font-style: normal;
	font-weight: normal;
	font-size: 52px;
	line-height: 60px;
	display: flex;
	height: 160px;
	margin-top: 25px;
	align-items: center;
	text-align: center;
	color: #13417c;
`;
const WelcomeText2 = styled.Text`
	font-family: "Poppins-Regular";
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 27px;
	display: flex;
	margin-bottom: 55px;
	align-items: center;
	text-align: center;
	width: 85%;
	color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.white : COLORS.deepBlue};
`;

const Label1 = styled.Text`
	color: #fff;
	align-self: center;
	padding: 10px;
	font-family: "Poppins-Regular";
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 27px;
	display: flex;
	align-items: center;
	text-align: center;
`;
const Label2 = styled.Text`
	color: #fff;
	align-self: center;
	padding: 10px;
	font-family: "Poppins-Regular";
	font-style: normal;
	font-weight: normal;
	font-size: 24px;
	line-height: 27px;
	display: flex;
	align-items: center;
	text-align: center;
`;

const ButtonContainer = styled.TouchableOpacity`
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.deepBlue : COLORS.deepBlue};
	margin-top: 5px;
	border-color: #fff;
	width: 155px;
	height: 55px;
	border-radius: 30px;
	margin: 10px;
`;

const ButtonGoogle = styled.TouchableOpacity`
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.deepBlue : COLORS.deepBlue};
	margin-top: 5px;

	width: 335px;
	height: 54px;
	border-radius: 30px;
	margin: 10px;
`;

const ButtonView = styled.View`
	flex-direction: row;
`;
