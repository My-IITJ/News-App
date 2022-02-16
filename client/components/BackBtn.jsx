import styled, { useTheme } from 'styled-components/native';
import { COLORS } from '../constants';
import { Ionicons } from '@expo/vector-icons';

const BackBtn = ({ navigation }) => {
	const theme = useTheme();
	return (
		<Wrapper onPress={navigation.goBack}>
			<Ionicons
				name="chevron-back-outline"
				size={24}
				color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
			/>
		</Wrapper>
	);
};

export default BackBtn;

// styles

const Wrapper = styled.TouchableOpacity`
	background-color: transparent;
	width: 40px;
	height: 40px;
	border: 1px solid
		${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.black)};
	border-radius: 50px;
	margin-left: 20px;
	justify-content: center;
	align-items: center;
`;
