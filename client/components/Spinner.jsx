import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { COLORS } from '../constants';

const Spinner = ({ containerStyle }) => {
	return (
		<Wrapper style={containerStyle}>
			<LottieView
				source={require('../assets/images/spinner.json')}
				autoPlay
				speed={4}
			/>
		</Wrapper>
	);
};

export default Spinner;

//styles
const Wrapper = styled.View`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	justify-content: center;
	align-items: center;
	height: 30px;
	margin: 8px 0;
`;
