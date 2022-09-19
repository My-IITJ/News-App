import { useCallback, useState } from 'react';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components/native';
import { COLORS } from '../constants';
import Constants from 'expo-constants';
import PostsList from '../components/PostsList';

import { useSearchPosts } from '../apiCalls/post';
import PageIndicators from '../components/PageIndicators';
import { Text } from 'react-native';
import Loading from '../components/Loading';
import TagsFilter from '../components/TagsFilter';
import { useFilterByTag } from '../apiCalls/tag';

const limit = 5;

const Explore = () => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [pageNo, setPageNo] = useState(1);
	const [selectedTags, setSelectedTags] = useState([]);
	const [isUpvote, setIsUpvote] = useState(false);

	const { isLoading, isError, error, data, refetch, isFetching } =
		useSearchPosts(pageNo, limit, searchPhrase);

	const {
		isLoading: isTagLoading,
		isError: isTagError,
		error: tagError,
		data: tagPosts,
		refetch: refetchTags,
		isFetching: isTagFetching,
	} = useFilterByTag(pageNo, limit, selectedTags);

	const searchInPosts = useCallback(
		(search) => {
			setPageNo(1);
			setSearchPhrase(search);
			setSelectedTags([]);
			refetch();
		},
		[refetch]
	);

	const filterPosts = useCallback(() => {
		setPageNo(1);
		if (selectedTags.length === 0) {
			return refetch();
		}
		refetchTags();
	}, [refetchTags, setPageNo, selectedTags, refetch]);

	const renderPosts = useCallback(() => {
		if (
			(isFetching || isTagFetching || isLoading || isTagLoading) &&
			!isUpvote
		) {
			return <Loading />;
		} else {
			return selectedTags.length > 0 ? (
				<PostsList
					setIsUpvote={setIsUpvote}
					posts={tagPosts?.data?.posts}
					page="Explore"
				/>
			) : (
				<PostsList
					setIsUpvote={setIsUpvote}
					posts={data?.data?.posts}
					page="Explore"
				/>
			);
		}
	}, [
		data,
		isFetching,
		isTagFetching,
		tagPosts,
		selectedTags,
		isUpvote,
		isLoading,
		isTagLoading,
	]);

	const isDisabled = useCallback(() => {
		return (
			data?.data?.posts?.length === 0 || tagPosts?.data?.posts?.length === 0
		);
	}, [data, tagPosts]);

	// if (isLoading || isTagLoading) {
	// 	return <Loading />;
	// }

	if (isError || isTagError) {
		return <Text>{error?.message || tagError?.message}</Text>;
	}

	return (
		<Container>
			<SearchBar
				searchPhrase={searchPhrase}
				setSearchPhrase={setSearchPhrase}
				searchInPosts={searchInPosts}
			/>
			<Box>
				{!isDisabled() && (
					<PageIndicators
						pageNo={pageNo}
						noOfPages={Math.ceil(data?.data?.count / limit)}
						setPageNo={setPageNo}
					/>
				)}
				<TagsFilter
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
					filterPosts={filterPosts}
				/>
			</Box>
			{renderPosts()}
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
	padding: 10px 20px;
`;
