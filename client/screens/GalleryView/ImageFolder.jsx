import * as React from 'react';
import { Avatar, Card } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ImageFolder = ({
    title,
    onPress
}) => (
  <Card onPress={onPress} style={{margin:10, borderRadius: 10}}>
    <Card.Title title={title} left={LeftContent} />
  </Card>
);

export default ImageFolder;