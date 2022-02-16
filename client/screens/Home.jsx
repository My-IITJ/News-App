import { Text } from 'react-native';
import styled from 'styled-components/native';

const Home = ({ navigation }) => {
	return (
		<Container>
			<Text>Home</Text>
			<Btn onPress={() => navigation.navigate('NewPost')}>
				<Text style={{ color: '#fff' }}>New Post</Text>
			</Btn>
		</Container>
	);
};

export default Home;

//styles
const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Btn = styled.TouchableOpacity`
	padding: 15px;
	background-color: #000;
	border-radius: 20px;
	margin-top: 10px;
`;
