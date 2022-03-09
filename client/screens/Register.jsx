import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";

const Register = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const theme = useTheme();
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ContainerBox>
				<WelcomeText>Create Account</WelcomeText>
				<PlaceHolder>Username</PlaceHolder>
				<TextField onChangeText={(username) => setUsername(username)} />
				<PlaceHolder>Email ID</PlaceHolder>
				<TextField onChangeText={(email) => setEmail(password)} />
				<PlaceHolder>Password</PlaceHolder>
				<TextField onChangeText={(password) => setPassword(password)} />
				<ButtonContainer>
					<Label1>Register</Label1>
				</ButtonContainer>
			</ContainerBox>
		</TouchableWithoutFeedback>
	);
};

const ContainerBox = styled.View`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.darkgrey : COLORS.white2};
	align-items: center;
	justify-content: center;
`;
const WelcomeText = styled.Text`
	font-family: "Poppins-Regular";
	font-style: normal;
	font-weight: normal;
	font-size: 48px;
	line-height: 72px;
	display: flex;
	align-items: center;
	color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.deepBlue : COLORS.deepBlue};
	width: 80%;
	height: 22.5%;
	left: 5px;
	top: 5px;
`;
const PlaceHolder = styled.Text`
	font-style: normal;
	font-weight: normal;
	font-size: 24px;
	line-height: 36px;
	display: flex;
	align-items: center;
	text-align: center;
	color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.white1 : COLORS.deepBlue};
	width: 50%;
	height: 8%;
	right: 20%;
	top: 2%;
`;
const TextField = styled.TextInput`
	width: 70%;
	height: 45px;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.deepBlue : COLORS.white1};
	margin-bottom: 10px;
	margin-top: 10px;
	align-items: center;
	color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.white1 : COLORS.deepBlue};
	border-radius: 30px;
	font-size: 18px;
	font-weight: 500;
	border-radius: 20px;

	shadow-color: #233b7a;
	shadow-opacity: 1.5;
	shadow-radius: 20px;
	elevation: 10;
	${
		"" /* left: 4px;
	top: 10px; */
	}
`;
const Label1 = styled.Text`
	color: white;
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
	background-color: #233b7a;
	align-items: center;
	justify-content: center;
	margin-top: 40px;
	border-color: white;
	width: 40%;
	height: 50px;
	border-radius: 30px;
	margin: 18%;
`;

export default Register;
