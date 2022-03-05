import { COLORS, SIZES } from '../constants/theme';
import styled from 'styled-components/native';

const ConfirmDelete = ({ onConfirm }) => {
	return (
		<Box>
			<Title>Are you sure you want to delete this?</Title>
			<Options>
				<Button onPress={onConfirm}>
					<Label>Yes</Label>
				</Button>
				<Button onPress={onConfirm}>
					<Label>No</Label>
				</Button>
			</Options>
		</Box>
	);
};

export default ConfirmDelete;

// styles

const Box = styled.View`
	width: 60%;
	background-color: ${COLORS.deepBlue};
	padding: 20px 25px;
	border-radius: ${SIZES.padding}px;
`;

const Title = styled.Text`
	font-size: 22px;
	color: ${COLORS.white1};
	font-weight: 400;
	line-height: 33px;
	letter-spacing: 0.5px;
	margin-bottom: 15px;
`;

const Options = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

const Button = styled.TouchableOpacity`
	background-color: ${COLORS.white1};
	padding: 10px;
	border-radius: ${SIZES.radius}px;
`;

const Label = styled.Text`
	font-size: 20px;
	letter-spacing: 4px;
`;
