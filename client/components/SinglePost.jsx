import { Text } from 'react-native';
import styled from 'styled-components/native';

const SinglePost = () => {
	return (
		<Container>
			<Text>SinglePost</Text>
		</Container>
	);
};

export default SinglePost;

//styles
const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
