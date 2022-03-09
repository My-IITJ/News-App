import styled from 'styled-components/native';
import { COLORS } from '../constants';
import Navbar from '../components/Navbar';
import Constants from 'expo-constants';
import PostsList from '../components/PostsList';
import ThemeBtn from '../components/ThemeBtn';
import { useGetPosts } from '../apiCalls/post';
import { Text } from 'react-native';
import Loading from '../components/Loading';

const limit = 3;

const Home = ({ navigation }) => {
	const {
		isLoading,
		isError,
		error,
		data,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useGetPosts(limit);

	if (isError) {
		return <Text>{error?.message}</Text>;
	}

	return (
		<Container>
			<Navbar />
			<ThemeBtn />
			{isLoading ? (
				<Loading />
			) : (
				<PostsList
					getMorePosts={fetchNextPage}
					reachedEnd={!hasNextPage}
					busy={isFetchingNextPage}
					data={data}
					page="Home"
				/>
			)}
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
