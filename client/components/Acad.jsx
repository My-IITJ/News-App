import React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";

const Acad = () => {
	return (
		<View>
			<Card style={Styles.container}>
				<Card.Content>
					<Title>ERP Portal</Title>
				</Card.Content>
				<Card.Cover source={require("../assets/images/ERP_Portal.png")} />
				<Card.Content>
					<Paragraph>Welcome to new academic portal of IIT Jodhpur</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button
						onPress={() => {
							Linking.openURL("http://220.158.144.41:8080/ERP_IITJ/");
						}}
					>
						Visit
					</Button>
				</Card.Actions>
			</Card>
			<Card style={Styles.container}>
				<Card.Content>
					<Title>Library</Title>
				</Card.Content>
				<Card.Cover source={require("../assets/images/Library.png")} />
				<Card.Content>
					<Paragraph>
						Explore the world’s knowledge : IIT Jodhpur Library
					</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button
						onPress={() => {
							Linking.openURL("https://library.iitj.ac.in/");
						}}
					>
						Visit
					</Button>
				</Card.Actions>
			</Card>
		</View>
	);
};
export default Acad;

const Styles = StyleSheet.create({
	container: {
		alignContent: "center",
<<<<<<< HEAD
		margin: 37,
	},
});
=======
		margin: 37,
	},
});
>>>>>>> 8f84ea7cc6100367d2c566a180d697a989189e13
