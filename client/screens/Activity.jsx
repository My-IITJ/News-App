import { useCallback, useState } from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components/native';
import Icon from '../components/Icon';
import { COLORS, isSmall, SIZES } from '../constants';
import PostsList from '../components/PostsList';
import Loading from '../components/Loading';
import {
	useGetSubscribedTags,
	useGetUserPosts,
	useGetUserSavedPosts,
} from '../apiCalls/user';
import NotFound from '../components/NotFound';

const tabs = ['posts', 'saved', 'subscribed tags'];
const limit = 5;

const Activity = ({ route }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);
	const { userId, username, title, img } = route?.params;
	// const userId = '62013735b5a9036d44510f68';

	const {
		isLoading,
		isError,
		error,
		data,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useGetUserPosts(limit, userId);

	const {
		isLoading: isSavedPostsLoading,
		isError: isSavedPostsError,
		error: savedPostsError,
		data: savedPosts,
		hasNextPage: hasSavedPostsNextPage,
		fetchNextPage: fetchSavedPostsNextPage,
		isFetchingNextPage: isSavedPostsFetchingNextPage,
	} = useGetUserSavedPosts(limit, userId);

	const {
		isLoading: isTagsLoading,
		isError: isTagsError,
		error: tagsError,
		data: tags,
	} = useGetSubscribedTags(userId);

	const renderSubscribedTags = useCallback(() => {
		return isTagsLoading ? (
			<Loading />
		) : (
			<FlatList
				showsVerticalScrollIndicator={false}
				style={{ flex: 1 }}
				data={tags?.data?.tags}
				keyExtractor={(i) => `tag-${i._id}`}
				renderItem={({ item }) => {
					const label = item.name.charAt(0).toUpperCase() + item.name.slice(1);
					return (
						<Tag>
							<Name size={20} ls={1.5}>
								{label}
							</Name>
							<Btn>
								<BtnLabel>Unfollow</BtnLabel>
							</Btn>
						</Tag>
					);
				}}
				ListEmptyComponent={NotFound}
				contentContainerStyle={[
					{
						paddingBottom: 20,
					},
				]}
			/>
		);
	}, [isTagsLoading, tags]);

	const renderPosts = useCallback(() => {
		return isLoading ? (
			<Loading />
		) : (
			<PostsList
				getMorePosts={fetchNextPage}
				reachedEnd={!hasNextPage}
				busy={isFetchingNextPage}
				data={data}
				page={`Activity-posts-${userId}`}
				contentContainerStyle={{ paddingHorizontal: 10 }}
			/>
		);
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, data, userId, isLoading]);

	const renderSavedPosts = useCallback(() => {
		return isSavedPostsLoading ? (
			<Loading />
		) : (
			<PostsList
				getMorePosts={fetchSavedPostsNextPage}
				reachedEnd={!hasSavedPostsNextPage}
				busy={isSavedPostsFetchingNextPage}
				data={savedPosts}
				page={`Activity-saved-posts-${userId}`}
				contentContainerStyle={{ paddingHorizontal: 10 }}
			/>
		);
	}, [
		fetchSavedPostsNextPage,
		hasSavedPostsNextPage,
		isSavedPostsFetchingNextPage,
		savedPosts,
		userId,
		isSavedPostsLoading,
	]);

	const renderTabContent = useCallback(() => {
		switch (selectedTab) {
			case tabs[0]:
				return renderPosts();
			case tabs[1]:
				return renderSavedPosts();
			case tabs[2]:
				return renderSubscribedTags();
			default:
				break;
		}
	}, [selectedTab, renderPosts, renderSubscribedTags, renderSavedPosts]);

	if (isError || isSavedPostsError || isTagsError) {
		return (
			<Text>
				{error?.message || savedPostsError?.message || tagsError?.message}
			</Text>
		);
	}

	return (
		<Container>
			<Header>
				<Icon
					src={{ uri: img }}
					radius={20}
					containerStyle={{
						marginRight: 10,
					}}
				/>
				<Details>
					<Name size={isSmall && 20}>{username}</Name>
					<Position>{title}</Position>
				</Details>
			</Header>

			<Options>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={tabs}
					keyExtractor={(i) => `activity-tab-${i}`}
					renderItem={({ item }) => {
						return (
							<Tab
								onPress={() => setSelectedTab(item)}
								selected={selectedTab === item}
							>
								<Label selected={selectedTab === item}>
									{item.toUpperCase()}
								</Label>
							</Tab>
						);
					}}
				/>
			</Options>

			<Box>{renderTabContent()}</Box>
		</Container>
	);
};

export default Activity;

//styles
const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding: 20px;
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
`;

const Details = styled.View`
	flex: 1;
	flex-direction: column;
`;

const Name = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${(p) => p.size || 22}px;
	font-weight: 700;
	letter-spacing: ${(p) => p.ls || 0}px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Position = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${isSmall ? 14 : 16}px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Options = styled.View`
	/* background-color: red; */
	border: ${(p) => `1px solid ${COLORS.gray10}`};
	border-left-width: 0;
	border-right-width: 0;
	margin: 20px -20px;
	padding: 14px;
`;

const Tab = styled.TouchableOpacity`
	padding: 4px 20px;
	border: ${(p) =>
		!p.selected
			? p.theme.name === 'dark'
				? `1px solid ${COLORS.white1}`
				: `1px solid ${COLORS.black}`
			: `1px solid ${COLORS.transparent}`};
	border-radius: ${SIZES.padding}px;
	margin: 0 10px 0 5px;
	background-color: ${(p) =>
		p.selected
			? p.theme.name === 'dark'
				? COLORS.purple
				: COLORS.deepBlue
			: COLORS.transparent};
`;

const Label = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${isSmall ? 16 : 20}px;
	letter-spacing: 1.5px;
	color: ${(p) =>
		p.selected || p.theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Box = styled.View`
	flex: 1;
`;

const Tag = styled.View`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkgrey : COLORS.white2};
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-radius: ${SIZES.radius}px;
	padding: 10px 18px;
`;

const Btn = styled.TouchableOpacity`
	border: ${(p) =>
		p.theme.name === 'dark'
			? `1px solid ${COLORS.white1}`
			: `1px solid ${COLORS.deepBlue}`};
	padding: 6px;
	border-radius: ${SIZES.base}px;
`;

const BtnLabel = styled.Text`
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue)};
	font-size: 18px;
	letter-spacing: 1.5px;
`;
