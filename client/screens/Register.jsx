import { COLORS, SIZES } from '../constants';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

const Register = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<Container>
			<WelcomeText>Create Account</WelcomeText>

			<Fields>
				<Box>
					<Label>Username</Label>
					<Input value={username} onChangeText={(text) => setUsername(text)} />
				</Box>

				<Box>
					<Label>Email ID</Label>
					<Input value={email} onChangeText={(text) => setEmail(text)} />
				</Box>

				<Box>
					<Label>Password</Label>
					<Input
						value={password}
						secureTextEntry
						onChangeText={(text) => setPassword(text)}
					/>
				</Box>
			</Fields>

			<ButtonContainer onPress={() => navigation.navigate('Landing')}>
				<Label1>Register</Label1>
			</ButtonContainer>
		</Container>
	);
};

export default Register;

//styles
const Container = styled.View`
	flex: 1;
	padding: 30px;
	padding-top: ${Constants.statusBarHeight + 20}px;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkgrey : COLORS.white2};
	justify-content: center;
`;

const WelcomeText = styled.Text`
	font-family: Poppins_400Regular;
	font-size: 48px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.purple2 : COLORS.deepBlue};
	width: 80%;
`;

const Fields = styled.View`
	/* flex: 1; */
	padding: 20px 10px;
`;

const Box = styled.View`
	justify-content: center;
	margin: 20px 0px;
`;

const Label = styled.Text`
	font-size: 22px;
	font-family: Poppins_400Regular;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue};
`;

const Input = styled.TextInput`
	padding: 12px 15px;
	margin-top: 8px;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.purple2 : COLORS.white1};
	opacity: ${({ theme }) => (theme.name === 'dark' ? 0.5 : 1)};
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue};
	border-radius: ${SIZES.font}px;
	font-size: 18px;
	shadow-color: #233b7a;
	shadow-opacity: 1.5;
	shadow-radius: 20px;
	elevation: 10;
`;

const ButtonContainer = styled.TouchableOpacity`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.purple2 : COLORS.deepBlue};
	align-items: center;
	border-radius: 30px;
	margin: 60px;
	padding: 10px;
`;

const Label1 = styled.Text`
	color: ${(p) => COLORS.white1};
	font-family: Poppins_400Regular;
	font-size: 22px;
	text-align: center;
`;
