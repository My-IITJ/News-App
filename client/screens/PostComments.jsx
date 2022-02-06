import { Text } from 'react-native';
import styled from 'styled-components/native';

const PostComments = () => {
	return (
		<Container>
			<Text>PostComments</Text>
		</Container>
	);
};

export default PostComments;

//styles
const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
