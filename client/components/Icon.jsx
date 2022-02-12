import { Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { SIZES } from '../constants';

// temporary component :  can be replaced/merged with profileIcon

const Icon = ({ src, containerStyle }) => {
	return (
		<Container style={containerStyle}>
			<Image source={src} width={20} height={20} resizeMode="cover" />
		</Container>
	);
};

export default Icon;

const Container = styled.View`
	margin-right: 10px;
	border-radius: ${SIZES.radius}px;
`;
