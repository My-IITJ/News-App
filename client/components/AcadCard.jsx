import React from 'react';
import { Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';

const AcadCard = ({ title, link, image, desc }) => {
	const openLink = (url) => {
		Linking.openURL(url);
	};
	console.log(image);
	return (
		<Card style={Styles.container}>
			<Card.Content style={{ padding: 10 }}>
				<Title
					style={{
						fontWeight: '600',
					}}
				>
					{title}
				</Title>
			</Card.Content>
			<Card.Cover
				source={{ uri: image } || require('../assets/images/ERP_Portal.png')}
			/>
			<Card.Content style={{ padding: 10 }}>
				<Paragraph style={{ marginBottom: 10 }}>{desc}</Paragraph>
			</Card.Content>
			<Card.Actions>
				<Button onPress={() => openLink(link)}>Visit</Button>
			</Card.Actions>
		</Card>
	);
};
export default AcadCard;

const Styles = StyleSheet.create({
	container: {
		alignContent: 'center',
		margin: 37,
	},
});

/* <Card style={Styles.container}>
				<Card.Content>
					<Title>Library</Title>
				</Card.Content>
				<Card.Cover source={require('../assets/images/Library.png')} />
				<Card.Content>
					<Paragraph>
						Explore the world’s knowledge : IIT Jodhpur Library
					</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button
						onPress={() => {
							Linking.openURL('https://library.iitj.ac.in/');
						}}
					>
						Visit
					</Button>
				</Card.Actions>
			</Card> */
