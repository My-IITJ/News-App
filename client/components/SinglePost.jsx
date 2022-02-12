import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { COLORS, SIZES } from '../constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Icon from './Icon';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

const tempTags = ['Research', 'Academics', 'Electrical', 'Btech'];

const SinglePost = ({ post }) => {
	const theme = useTheme();
	const navigation = useNavigation();
	const { username, title, profileImg, createdAt, tags, thumbnail, upvotes } =
		post;

	return (
		<Container>
			<Header>
				<Icon src={require('../assets/images/icon.png')} />
				<Details>
					<TouchableOpacity>
						<Name>{'Suman Kundu'}</Name>
						<Position>{'Prof. CSE Dept'}</Position>
						<Time>{'5 min ago'}</Time>
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

			<Content numberOfLines={2}>
				lorem ipsum dolor sit amet, consectetur adipis lorem ipsum dolor sit
				amet, consectetur adipis lorem ipsum dolor sit amet, consectetur adipis
				lorem ipsum dolor sit amet, consectetur adipis lorem ipsum dolor sit
				amet, consectetur adipis lorem ipsum dolor sit amet, consectetur adipis
			</Content>

			<Tags>
				{tempTags.map((t, idx) => (
					<Tag key={idx}>
						<Label>{t}</Label>
					</Tag>
				))}
			</Tags>

			<Thumbnail>
				<Image
					source={require('../assets/images/post.png')}
					resizeMode="contain"
				/>
			</Thumbnail>

			<Action>
				<ActionBtn>
					<AntDesign name="arrowup" size={25} color={COLORS.white1} />
					<ActionLabel>{'99'}</ActionLabel>
				</ActionBtn>

				<ActionBtn
					onPress={() => navigation.navigate('PostComments', { post })}
				>
					<Ionicons name="chatbubble-outline" size={25} color={COLORS.white1} />
					<ActionLabel>{'2'}</ActionLabel>
				</ActionBtn>
			</Action>
		</Container>
	);
};

export default SinglePost;

//styles
const Container = styled.View`
	flex: 1;
	justify-content: center;
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
	font-family: 'Poppins-Regular';
	font-size: 18px;
	font-weight: 700;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Position = styled.Text`
	font-family: 'Poppins-Regular';
	font-size: 12px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Time = styled.Text`
	font-family: 'Poppins-Regular';
	font-size: 12px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Content = styled.Text`
	margin: 10px 0px;
	font-family: 'Poppins-Regular';
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
	width: 55%;
	border-radius: ${SIZES.radius + 2}px;
	position: absolute;
	z-index: 1;
	bottom: 25px;
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
