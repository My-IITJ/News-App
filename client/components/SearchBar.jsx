import { Text } from 'react-native';
import styled from 'styled-components/native';

const SearchBar = () => {
	return (
		<Container>
			<Text>SearchBar</Text>
		</Container>
	);
};

export default SearchBar;

//styles
const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
