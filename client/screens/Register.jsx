import { COLORS, isSmall, SIZES } from '../constants';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import auth from '@react-native-firebase/auth';

const Register = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegistration = useCallback(() => {
		if (email.length === 0 || password.length === 0) {
			console.log('invalid');
			return;
		}

		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				console.log('User account created & signed in!');
			})
			.catch((error) => {
				if (error.code === 'auth/email-already-in-use') {
					console.log('That email address is already in use!');
				}

				if (error.code === 'auth/invalid-email') {
					console.log('That email address is invalid!');
				}

				console.error(error);
			});
	}, [email, password]);

	return (
		<Container>
			<WelcomeText>Create Account</WelcomeText>

			<Fields>
				{/* <Box>
					<Label>Username</Label>
					<Input value={username} onChangeText={(text) => setUsername(text)} />
				</Box> */}

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

			<ButtonContainer onPress={handleRegistration}>
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
	font-size: ${isSmall ? 44 : 48}px;
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
	margin: ${isSmall ? 10 : 20}px 0px;
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
	font-size: ${isSmall ? 16 : 18}px;
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
	margin: ${isSmall ? '30px 60px' : '60px'};
	padding: 10px;
`;

const Label1 = styled.Text`
	color: ${(p) => COLORS.white1};
	font-family: Poppins_400Regular;
	font-size: ${isSmall ? 20 : 22}px;
	text-align: center;
`;
