import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";

const Ut = () => {
	return (
		<ScrollView>
			<Card style={Styles.container}>
				<Card.Content>
					<Title>Health Center</Title>
				</Card.Content>
				<Card.Cover source={require("../assets/images/HC.png")} />
				<Card.Content>
					<Paragraph>
						An ISO 9001:2005 certified health centre with OPD and ambulance
						service
					</Paragraph>
				</Card.Content>
			</Card>
			<Card style={Styles.container}>
				<Card.Content>
					<Title>Hostels</Title>
				</Card.Content>
				<Card.Cover source={require("../assets/images/Hostel.png")} />
				<Card.Content>
					<Paragraph>
						State of the art insulated building providing comfortable
						temperatures pan year
					</Paragraph>
				</Card.Content>
			</Card>
			<Card style={Styles.container}>
				<Card.Content>
					<Title>Transport</Title>
				</Card.Content>
				<Card.Cover source={require("../assets/images/Transport.png")} />
				<Card.Content>
					<Paragraph>
						Bus facility for students to and fro from IIT J campus to Jodhpur
						city on a daily basis
					</Paragraph>
				</Card.Content>
			</Card>
		</ScrollView>
	);
};
export default Ut;

const Styles = StyleSheet.create({
	container: {
		alignContent: "center",
		margin: 37,
	},
});
