import styled from 'styled-components/native';
import { COLORS } from '../constants';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import PostsList from '../components/PostsList';
import ThemeBtn from '../components/ThemeBtn';

const Home = ({ navigation }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const posts = [...Array(20).keys()];
		setPosts(posts);
	}, []);

	return (
		<Container>
			<Navbar />
			<ThemeBtn />
			<PostsList posts={posts} page="Home" />
		</Container>
	);
};

export default Home;

//styles
const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;
