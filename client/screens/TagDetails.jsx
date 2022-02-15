import styled from 'styled-components/native';
import { COLORS, SIZES } from '../constants';
import { Feather } from '@expo/vector-icons';
import PostsList from '../components/PostsList';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

const dummy = {
	name: 'Research',
	desc: 'lorem ipsum dolor sit amet, consectetur adip asbjaK loreem loremamet, consectetur adip asbjaK loreem',
};

const TagDetails = ({ tagId }) => {
	const [posts, setPosts] = useState([]);
	const theme = useTheme();

	useEffect(() => {
		const posts = [...Array(20).keys()];
		setPosts(posts);
	}, []);

	return (
		<Container>
			<Tag>
				<Box>
					<Feather
						name="award"
						size={24}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
					<Title ml={6} size={20}>
						{dummy.name}
					</Title>

					<Follow>
						<Feather
							name="bell"
							size={16}
							color={theme.name === 'dark' ? COLORS.white1 : COLORS.gray50}
						/>
						<Title
							ml={6}
							size={16}
							color={theme.name === 'light' && COLORS.gray50}
						>
							Follow
						</Title>
					</Follow>
				</Box>

				<Title font={600}>Description:</Title>

				<Desc>{dummy.desc}</Desc>
			</Tag>

			<Title mb={10} size={20}>
				Recent Posts
			</Title>

			<PostsList
				posts={posts}
				page="Explore"
				contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 5 }}
			/>
		</Container>
	);
};

export default TagDetails;

// styles

const color = (name) => {
	return name === 'dark' ? COLORS.white1 : COLORS.black;
};

const Container = styled.View`
	flex: 1;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding: 10px 20px;
`;

const Tag = styled.View`
	padding: 20px;
	margin-bottom: 15px;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkgrey : COLORS.white2};
	border-radius: ${SIZES.radius}px;
`;

const Box = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
`;

const Title = styled.Text`
	font-family: 'Poppins-Regular';
	font-size: ${(p) => p.size || 18}px;
	margin-left: ${(p) => p.ml || 0}px;
	margin-bottom: ${(p) => p.mb || 0}px;
	color: ${(p) => p.color || color(p.theme.name)};
	font-weight: ${(p) => p.font || 700};
`;

const Follow = styled.TouchableOpacity`
	margin-left: auto;
	flex-direction: row;
	align-items: center;
`;

const Desc = styled.Text`
	font-family: 'Poppins-Regular';
	font-size: 16px;
	color: ${(p) => color(p.theme.name)};
	font-weight: 500;
	margin-top: 10px;
	text-align: justify;
`;
