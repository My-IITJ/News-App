import { Text } from 'react-native';
import styled from 'styled-components/native';

const NewPost = () => {
	return (
		<Container>
			<Text>NewPost</Text>
		</Container>
	);
};

export default NewPost;

//styles
const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
