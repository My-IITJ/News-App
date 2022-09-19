import { Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { SIZES } from '../constants';

const Icon = ({
	src,
	containerStyle = {},
	width = 50,
	height = 50,
	radius = 0,
	resizeMode,
}) => {
	return (
		<Container style={containerStyle}>
			<Image
				source={src}
				style={{ width, height, borderRadius: radius }}
				resizeMode={resizeMode || 'contain'}
			/>
		</Container>
	);
};

export default Icon;

const Container = styled.View`
	border-radius: ${SIZES.radius}px;
`;
