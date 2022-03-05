import styled from 'styled-components/native';
import { COLORS } from '../constants';

const ReachedEnd = () => {
	return (
		<Container>
			<Text>-</Text>
			<Text>You're all caught up</Text>
			<Text>-</Text>
		</Container>
	);
};

export default ReachedEnd;

// styles

const Container = styled.View`
	margin: 5px 0;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const Text = styled.Text`
	text-align: center;
	margin: 0 8px;
	font-size: 15px;
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.gray50 : COLORS.gray10)};
`;
