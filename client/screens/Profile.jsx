import { Text } from 'react-native';
import styled from 'styled-components/native';

const Profile = () => {
	return (
		<Container>
			<Text>Profile</Text>
		</Container>
	);
};

export default Profile;

//styles
const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
