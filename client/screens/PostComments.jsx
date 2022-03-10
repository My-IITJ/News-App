import styled, { useTheme } from 'styled-components/native';
import { COLORS, SIZES } from '../constants';
import SinglePost from '../components/SinglePost';
import { ScrollView, Text, Keyboard } from 'react-native';
import Comment from '../components/Comment';
import { FontAwesome } from '@expo/vector-icons';
import { useGetPostComments } from '../apiCalls/post';
import Loading from '../components/Loading';
import { useAddComment } from '../apiCalls/comment';
import { useCallback, useState, useRef } from 'react';

const PostComments = ({ route }) => {
	const theme = useTheme();
	const { postId } = route.params;
	const scrollViewRef = useRef();
	const [newComment, setNewComment] = useState({
		parent: { id: postId, type: 'post' },
		userId: '62013735b5a9036d44510f68',
		content: null,
	});

	const { isLoading, isError, error, data } = useGetPostComments(postId);
	const { mutate } = useAddComment();

	const addNewComment = useCallback(() => {
		if (!newComment.content) return;
		Keyboard.dismiss();
		mutate(newComment);
		setNewComment((p) => ({ ...p, content: null }));
	}, [newComment, mutate]);

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return <Text>{error?.message}</Text>;
	}

	return (
		<Container>
			<ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
				<SinglePost all post={data?.data?.post} />
				{data?.data?.post.comments.map((i) => {
					return <Comment key={i._id} item={i} postId={postId} />;
				})}
			</ScrollView>
			<NewComment>
				<Input
					multiline={true}
					maxLength={150}
					placeholder="Add Comment"
					placeholderTextColor={
						theme.name === 'dark' ? COLORS.white1 : COLORS.black
					}
					value={newComment.content}
					onChangeText={(text) =>
						setNewComment((p) => ({ ...p, content: text }))
					}
				/>
				<Send onPress={addNewComment}>
					<FontAwesome
						name="send"
						size={24}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
				</Send>
			</NewComment>
		</Container>
	);
};

export default PostComments;

//styles
const Container = styled.View`
	flex: 1;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding: 10px 20px;
`;

const NewComment = styled.View`
	margin-top: 10px;
	flex-direction: row;
	align-items: center;
	padding: 8px 8px 8px 0;
`;

const Input = styled.TextInput`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkgrey : COLORS.white2};
	flex: 1;
	margin-right: 10px;
	min-height: 50px;
	border-radius: ${SIZES.radius}px;
	padding: 8px 18px;
`;

const Send = styled.TouchableOpacity``;
