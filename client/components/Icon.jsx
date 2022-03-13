import { Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { SIZES } from '../constants';

// temporary component :  can be replaced/merged with profileIcon

const Icon = ({ src, containerStyle, width = 50, height = 50 }) => {
	return (
		<Container style={containerStyle}>
			<Image source={src} style={{ width, height }} resizeMode="contain" />
		</Container>
	);
};

export default Icon;

const Container = styled.View`
	margin-right: 10px;
	border-radius: ${SIZES.radius}px;
`;
