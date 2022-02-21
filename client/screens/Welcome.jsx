import styled from "styled-components/native";
import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";

export default class Welcome extends Component {
	render() {
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
						lorem ipsum dolor sit aminlorem ipsum dolor sit aminlorem ipsum
						dolor sit aminlorem ipsum dolor sit
					</WelcomeText2>
					<ButtonView>
						<ButtonContainer
							// onPress={props.onPress}
							underlayColor={colors.highlight}
						>
							<Label1>Sign In</Label1>
						</ButtonContainer>
						<ButtonContainer
							// onPress={props.onPress}
							underlayColor={colors.highlight}
						>
							<Label1>Register</Label1>
						</ButtonContainer>
					</ButtonView>
					<Line> ────────────────────────────────</Line>

					<ButtonGoogle
						// onPress={props.onPress}
						underlayColor={colors.highlight}
					>
						<Label2>
							<AntDesign name="google" size={24} color="white" /> Continue with
							Google
						</Label2>
					</ButtonGoogle>
				</OuterBox>
			</Container>
		);
	}
}
const Container = styled.View`
	padding: 3% 3%;
`;
const OuterBox = styled.View`
	padding-top: 5%;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #ffffff;
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
	background-color: #ffffff;
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
	background-color: #ffffff;
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
	align-items: center;
	text-align: center;
	width: 85%;
	color: #13417c;
`;
const colors = {
	accent: "#233B7A",
	highlight: "#D22",
	contrast: "#FFF",
};

const Label1 = styled.Text`
	color: ${(props) => (!props.outline ? colors.contrast : colors.accent)};
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
	color: ${(props) => (!props.outline ? colors.contrast : colors.accent)};
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

const ButtonContainer = styled.TouchableHighlight`
	background-color: ${(props) =>
		props.outline ? colors.contrast : colors.accent};
	margin-top: 5px;
	border-color: ${colors.accent};
	border-width: 2px;
	width: 155px;
	height: 55px;
	border-radius: 30px;
	margin: 10px;
`;

const ButtonGoogle = styled.TouchableHighlight`
	background-color: ${(props) =>
		props.outline ? colors.contrast : colors.accent};
	margin-top: 5px;
	border-color: ${colors.accent};
	border-width: 2px;
	width: 335px;
	height: 50px;
	border-radius: 30px;
	margin: 10px;
`;

const ButtonView = styled.View`
	flex-direction: row;
`;
