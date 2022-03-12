import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { COLORS, SIZES } from '../constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Icon from './Icon';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useUpvotePost } from '../apiCalls/post';
import { useCallback } from 'react';

const SinglePost = ({ post, all, setIsUpvote }) => {
	const theme = useTheme();
	const navigation = useNavigation();
	const {
		author,
		content,
		createdAt,
		tags = [],
		comments,
		thumbnail,
		upvotes,
	} = post;

	const { mutate } = useUpvotePost();

	const toggleVote = useCallback(() => {
		const body = {
			postId: post._id,
			userId: '62013735b5a9036d44510f68',
		};

		mutate(body);

		if (setIsUpvote) {
			setIsUpvote(true);
		}
	}, [mutate, post, setIsUpvote]);

	return (
		<Container all={all} height={thumbnail}>
			<Header>
				<Icon src={require('../assets/images/icon.png')} />
				<Details>
					<TouchableOpacity>
						<Name>{author?.username}</Name>
						<Position>{author?.title}</Position>
						<Time>{moment(createdAt).fromNow()}</Time>
					</TouchableOpacity>
				</Details>

				<TouchableOpacity>
					<Ionicons
						name="ios-bookmark-outline"
						size={25}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
				</TouchableOpacity>
			</Header>

			<TouchableOpacity
				onPress={() =>
					!all && navigation.navigate('PostComments', { postId: post._id })
				}
			>
				<Content numberOfLines={all ? 20 : !thumbnail ? 4 : 2}>
					{content ||
						`lorem ipsum dolor sit amet, consectetur adipis lorem ipsum dolor sit
					amet, consectetur adipis lorem ipsum dolor sit amet, consectetur
					adipis lorem ipsum dolor sit amet, consectetur adipis lorem ipsum
					dolor sit amet, consectetur adipis lorem ipsum dolor sit amet,
					consectetur adipis`}
				</Content>
			</TouchableOpacity>

			<Tags>
				{tags?.map((t, idx) => {
					const label = t.name.charAt(0).toUpperCase() + t.name.slice(1);
					return (
						<Tag
							onPress={() =>
								navigation.navigate('TagDetails', { tagId: t._id })
							}
							key={idx}
						>
							<Label>{label}</Label>
						</Tag>
					);
				})}
			</Tags>

			{thumbnail && (
				<Thumbnail>
					<Image
						source={require('../assets/images/post.png')}
						resizeMode="contain"
					/>
				</Thumbnail>
			)}

			<Action bottom={thumbnail}>
				<ActionBtn onPress={toggleVote}>
					<AntDesign name="arrowup" size={25} color={COLORS.white1} />
					<ActionLabel>{upvotes?.length || 0}</ActionLabel>
				</ActionBtn>

				<ActionBtn
					onPress={() =>
						!all && navigation.navigate('PostComments', { postId: post._id })
					}
				>
					<Ionicons name="chatbubble-outline" size={25} color={COLORS.white1} />
					<ActionLabel>{comments?.length || 0}</ActionLabel>
				</ActionBtn>
			</Action>
		</Container>
	);
};

export default SinglePost;

const getHeight = (height, all) => {
	if (all) {
		return height ? 'auto' : '300px';
	}

	return `${height ? 502 : 240}px`;
};

//styles
const Container = styled.View`
	height: ${(p) => getHeight(p.height, p.all)};
	align-items: center;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkgrey : COLORS.white2};
	padding: 20px;
	border-radius: ${SIZES.radius}px;
	margin: 10px 0px;
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	width: 100%;
`;

const Details = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`;

const Name = styled.Text`
	font-family: Poppins_400Regular;
	font-size: 18px;
	font-weight: 700;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Position = styled.Text`
	font-family: Poppins_400Regular;
	font-size: 12px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Time = styled.Text`
	font-family: Poppins_400Regular;
	font-size: 12px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Content = styled.Text`
	margin: 10px 0px;
	font-family: Poppins_400Regular;
	text-align: justify;
	font-size: 14px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Tags = styled.View`
	flex-direction: row;
	align-items: center;
	width: 100%;
`;

const Tag = styled.TouchableOpacity`
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.purple : COLORS.deepBlue};
	padding: 6px;
	margin-right: 15px;
	border-radius: ${SIZES.padding}px;
`;

const Label = styled.Text`
	color: ${COLORS.white1};
	font-size: 13px;
`;

const Thumbnail = styled.View`
	width: 100%;
	height: 300px;
	margin: 15px 0px;
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;
`;

const Action = styled.View`
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.purple : COLORS.deepBlue1};
	flex-direction: row;
	padding: 8px;
	border-radius: ${SIZES.radius + 2}px;
	position: ${(p) => (p.bottom ? 'absolute' : 'relative')};
	z-index: 1;
	margin-top: ${(p) => (p.bottom ? 'auto' : '10px')};
	bottom: ${(p) => (p.bottom ? 25 : 18)}px;
	justify-content: center;
`;

const ActionBtn = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 0px 10px;
`;

const ActionLabel = styled.Text`
	color: ${COLORS.white1};
	margin-left: 4px;
`;
