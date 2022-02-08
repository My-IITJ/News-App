import { Text } from 'react-native';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

const Home = ({ navigation }) => {
	const theme = useTheme(); // gets the current theme
	return (
		<Container>
			<Text>Home</Text>
			<Btn
				bgColor={theme.backgroundColor1}
				onPress={() => navigation.navigate('NewPost')}
			>
				<Text style={{ color: theme.textColor }}>New Post</Text>
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
	background-color: ${(p) => p.bgColor};
	border-radius: 20px;
	margin-top: 10px;
`;
