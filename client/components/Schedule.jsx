import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Card, IconButton } from "react-native-paper";

const Schedule = (p) => {
	return (
		<View>
			<Card.Title
				title={p.event}
				subtitle={p.date}
				left={(props) => <Avatar.Icon {...props} icon="calendar" />}
			/>
		</View>
	);
};

export default Schedule;