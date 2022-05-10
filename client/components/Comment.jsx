import styled, { useTheme } from 'styled-components/native';
import React, { useCallback } from 'react';
import Icon from './Icon';
import { COLORS, isSmall, SIZES } from '../constants';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUpvoteComment } from '../apiCalls/comment';

const Comment = ({ item, postId }) => {
	const theme = useTheme();

	const { mutate } = useUpvoteComment();

	const toggleVote = useCallback(() => {
		const body = {
			postId,
			commentId: item._id,
			userId: '62013735b5a9036d44510f68',
		};

		mutate(body);
	}, [mutate, item, postId]);

	return (
		<Container>
			<Icon
				containerStyle={{ marginRight: 10 }}
				width={40}
				height={40}
				src={{ uri: item?.author?.profileImg }}
				radius={10}
				resizeMode="cover"
			/>
			<Wrapper>
				<Box>
					<CommentText>
						{item?.content || 'lorem ipsum dolor sit amet'}
					</CommentText>
				</Box>
				<Action>
					<ActionBtn onPress={() => postId && toggleVote()}>
						<AntDesign
							name="arrowup"
							size={18}
							color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
						/>
						<ActionLabel>{item?.upvotes?.length || 0}</ActionLabel>
					</ActionBtn>
					{/* <ActionLabel style={{ fontSize: 25 }}>|</ActionLabel> */}
					{/* <ActionBtn>
						<MaterialCommunityIcons
							name="reply-outline"
							size={18}
							color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
						/>
						<ActionLabel>{item?.replies?.length || '2'}</ActionLabel>
					</ActionBtn> */}
				</Action>
			</Wrapper>
		</Container>
	);
};

export default Comment;

//styles

const Container = styled.View`
	flex-direction: row;
	margin: 2px 0;
`;

const Wrapper = styled.View`
	flex: 1;
`;

const Box = styled.View`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkgrey : COLORS.white2};
	padding: 14px;
	width: 90%;
	border-top-right-radius: ${SIZES.radius}px;
	border-bottom-left-radius: ${SIZES.radius}px;
	border-bottom-right-radius: ${SIZES.radius}px;
`;

const CommentText = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${isSmall ? 12 : 14}px;
	font-weight: 600;
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.black)};
`;

const Action = styled.View`
	flex-direction: row;
	align-items: center;
	padding: 4px;
`;

const ActionBtn = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 0px 10px;
`;

const ActionLabel = styled.Text`
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.black)};
	margin-left: 4px;
	font-weight: 600;
`;
