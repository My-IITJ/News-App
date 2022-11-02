import { FlatList } from "react-native";
import React, { useCallback } from "react";
import SinglePost from "./SinglePost";
import styled from "styled-components/native";
import ReachedEnd from "./ReachedEnd";
import NotFound from "./NotFound";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { ROLES } from "../apiCalls/client";

// const ITEM_SIZE = 525;

const PostsList = ({
	posts,
	page,
	contentContainerStyle,
	getMorePosts,
	reachedEnd,
	busy,
	onRefresh,
	data,
	setIsUpvote,
	onScroll,
}) => {
	const user = useSelector((s) => s.user.data);

	const allPosts = useCallback(() => {
		if (data) {
			let p = [];
			data?.pages.forEach((page) => {
				p = [...p, ...page.data.posts];
			});
			return p;
		}
		return posts;
	}, [data, posts]);

	//temporary fix
	const filterPosts = (posts) => {
		if (user.role === ROLES.GUEST) {
			posts = posts.filter((i) => i.visibility !== "Private");
		}

		return posts;
	};

	return (
		<Container>
			<FlatList
				onScroll={onScroll}
				data={filterPosts(allPosts())}
				style={{ flex: 1 }}
				keyExtractor={(_, idx) => `post-${page}-${idx}`}
				renderItem={({ item }) => {
					return <SinglePost post={item} setIsUpvote={setIsUpvote} />;
				}}
				ListFooterComponent={() => {
					if (reachedEnd && allPosts().length > 1) {
						return <ReachedEnd />;
					}

					if (busy) {
						return <Spinner />;
					}
					return null;
				}}
				ListEmptyComponent={NotFound}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					{
						paddingHorizontal: 20,
						paddingBottom: 20,
					},
					contentContainerStyle,
				]}
				onEndReached={getMorePosts}
				onEndReachedThreshold={0}
			/>
		</Container>
	);
};

export default PostsList;

// styles

const Container = styled.View`
	flex: 1;
`;
