import React from 'react';
import { Linking } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { COLORS } from '../constants';

const AcadCard = ({ title, link, image, desc }) => {
	const openLink = (url) => {
		Linking.openURL(url);
	};

	return (
		<Card
			style={{
				backgroundColor: COLORS.white2,
				marginVertical: 8,
			}}
		>
			<Card.Content style={{ padding: 10 }}>
				<Title
					style={{
						fontWeight: '600',
					}}
				>
					{title}
				</Title>
			</Card.Content>
			<Card.Cover source={{ uri: image }} />
			<Card.Content style={{ padding: 10 }}>
				<Paragraph style={{ marginBottom: 10 }}>{desc}</Paragraph>
				<Button
					style={{
						marginRight: 'auto',
					}}
					mode="text"
					buttonColor={COLORS.deepBlue}
					textColor={COLORS.white1}
					onPress={() => openLink(link)}
				>
					Visit
				</Button>
			</Card.Content>
		</Card>
	);
};
export default AcadCard;
