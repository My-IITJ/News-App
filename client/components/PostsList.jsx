import { FlatList } from 'react-native';
import React from 'react';
import SinglePost from './SinglePost';
import styled from 'styled-components/native';

// const ITEM_SIZE = 525;

const PostsList = ({ posts, page, contentContainerStyle }) => {
	return (
		<Container>
			<FlatList
				data={posts}
				style={{ flex: 1 }}
				keyExtractor={(_, idx) => `post-${page}-${idx}`}
				renderItem={({ item, index }) => {
					return <SinglePost post={item} />;
				}}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					{
						paddingHorizontal: 20,
						paddingBottom: 20,
					},
					contentContainerStyle,
				]}
			/>
		</Container>
	);
};

export default PostsList;

// styles

const Container = styled.View`
	flex: 1;
`;
