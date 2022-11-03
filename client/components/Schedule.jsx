import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Card, IconButton, Title, Paragraph } from "react-native-paper";
import { COLORS, isSmall, SIZES } from "../constants";
import styled, { useTheme } from "styled-components/native";

const Schedule = (p) => {
	const theme = useTheme();
	return (
		<Cont>
			<Card.Title
				left={(props) => <Avatar.Icon {...props} icon="calendar" />}
			/>
			<Cont2>
				<SText>{p.event}</SText>
				<SText>{p.date}</SText>
			</Cont2>
		</Cont>
	);
};

export default Schedule;

const SText = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${isSmall ? 12 : 14}px;
	font-weight: 600;
	color: ${(p) => (p.theme.name === "dark" ? COLORS.white1 : COLORS.black)};
`;

const Cont = styled.View`
	flex-direction: row;
`;

const Cont2 = styled.View`
	flex-direction: column;
	margin-top: 15px;
`;
