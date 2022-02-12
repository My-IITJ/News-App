import { Text } from 'react-native';
import styled from 'styled-components/native';

const NavBar = () => {
	return (
		<Container>
			<Text>NavBar</Text>
		</Container>
	);
};

export default NavBar;

//styles
const Container = styled.View`
	height: 60px;
	padding: 20px;
`;
