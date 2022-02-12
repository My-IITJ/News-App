import { FlatList, View } from 'react-native';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import { COLORS } from '../constants';
import Navbar from '../components/Navbar';
import SinglePost from '../components/SinglePost';
import { useEffect, useState } from 'react';

const Home = ({ navigation }) => {
	const theme = useTheme(); // gets the current theme
	const [posts, setPosts] = useState([1, 2, 3]);

	return (
		<Container dark={theme.name === 'dark'}>
			<Navbar />
			<View>
				<FlatList
					data={posts}
					keyExtractor={(_, idx) => `post-${idx}`}
					renderItem={({ item }) => <SinglePost post={item} />}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={
						<View
							style={{
								height: 40,
							}}
						/>
					}
				/>
			</View>
		</Container>
	);
};

export default Home;

//styles
const Container = styled.View`
	flex: 1;
	background-color: ${({ dark }) => (dark ? COLORS.darkPurple : COLORS.white1)};
	padding: 20px;
`;
