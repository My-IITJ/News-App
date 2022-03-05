import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components/native';
import { COLORS } from '../constants';
import Constants from 'expo-constants';
import PostsList from '../components/PostsList';

import { useSearchPosts } from '../apiCalls/post';
import PageIndicators from '../components/PageIndicators';
import AppLoading from 'expo-app-loading';
import { Text } from 'react-native';

const limit = 3;

const Explore = ({ navigation }) => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [pageNo, setPageNo] = useState(1);

	const { isLoading, isError, error, data, refetch } = useSearchPosts(
		pageNo,
		limit,
		searchPhrase
	);

	const searchInPosts = (search) => {
		setPageNo(1);
		setSearchPhrase(search);
		refetch();
	};

	if (isLoading) {
		return <AppLoading />;
	}

	if (isError) {
		return <Text>{error?.message}</Text>;
	}

	return (
		<Container>
			<SearchBar
				searchPhrase={searchPhrase}
				setSearchPhrase={setSearchPhrase}
				searchInPosts={searchInPosts}
			/>
			<Box>
				<PageIndicators
					pageNo={pageNo}
					noOfPages={Math.ceil(data?.data?.count / limit)}
					setPageNo={setPageNo}
				/>
				<FilterByTags />
			</Box>
			<PostsList posts={data?.data?.posts} page="Explore" />
		</Container>
	);
};

export default Explore;

//styles

const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;

const Box = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	padding: 0 20px;
`;

const FilterByTags = styled.View`
	height: 40px;
	margin-bottom: 15px;
`;
