import styled, { useTheme } from 'styled-components/native';
import Navbar from '../components/Navbar';
import { COLORS, icons, SIZES } from '../constants';
import Constants from 'expo-constants';
import ThemeBtn from '../components/ThemeBtn';
import Icon from '../components/Icon';
import { TouchableOpacity } from 'react-native';
import {
	AntDesign,
	FontAwesome5,
	Ionicons,
	MaterialIcons,
} from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
	useGetProfileDetails,
	useGetSubscribedTags,
	useEditProfile,
} from '../apiCalls/user';
import Loading from '../components/Loading';
import BlurModal from '../components/BlurModal';
import { useSelector } from 'react-redux';

const Profile = ({
	navigation,
	route: {
		params: { _id },
	},
}) => {
	const theme = useTheme();
	const user = useSelector((s) => s.user.data);

	const [editHeader, setEditHeader] = useState(false);
	const [editAbout, setEditAbout] = useState(true);
	const [editContact, setEditContact] = useState(false);

	const [about, setAbout] = useState('');
	const [contact, setContact] = useState({
		mail: '',
		link: '',
	});

	const { isLoading, isError, error, data } = useGetProfileDetails(
		_id,
		'profile'
	);

	const [header, setHeader] = useState({
		username: data?.data?.username,
		title: data?.data?.title,
		img: '',
	});

	const { mutate } = useEditProfile();

	const {
		isLoading: isTagsLoading,
		isError: isTagsError,
		error: tagsError,
		data: tags,
	} = useGetSubscribedTags(_id);

	const handleLogout = useCallback(() => {
		// dispatch(logout());
		auth()
			.signOut()
			.then(() => console.log('User signed out!'));
	}, []);

	const renderEditHeaderModal = useCallback(() => {
		return (
			<BlurModal
				visible={editHeader}
				toggleModal={() => setEditHeader((p) => !p)}
			>
				<Box
					col
					style={{ width: '80%', alignItems: 'flex-start', marginVertical: 8 }}
				>
					<Label>Username</Label>
					<Input
						value={header.username}
						onChangeText={(text) =>
							setHeader((p) => ({ ...p, username: text }))
						}
					/>
				</Box>
				<Box
					col
					style={{ width: '80%', alignItems: 'flex-start', marginVertical: 8 }}
				>
					<Label>Title</Label>
					<Input
						value={header.title}
						onChangeText={(text) => setHeader((p) => ({ ...p, title: text }))}
					/>
				</Box>

				<SaveBtn
					onPress={() => {
						mutate({
							userId: _id,
							data: header,
						});
						setEditHeader(false);
					}}
				>
					<Name sz={20} color={COLORS.white1}>
						Save
					</Name>
				</SaveBtn>
			</BlurModal>
		);
	}, [editHeader, header, mutate, _id]);

	const renderEditAboutModal = useCallback(() => {
		<BlurModal visible={editAbout} toggleModal={() => setEditAbout((p) => !p)}>
			<Name>Hi</Name>
		</BlurModal>;
	}, [editAbout]);

	const renderEditContactModal = useCallback(() => {
		<BlurModal
			visible={editContact}
			toggleModal={() => setEditContact((p) => !p)}
		>
			<Name>Hi</Name>
		</BlurModal>;
	}, [editContact]);

	if (isLoading || isTagsLoading) {
		return <Loading />;
	}

	if (isError || isTagsError) {
		return <Text>{error?.message || tagsError?.message}</Text>;
	}

	return (
		<Container>
			<Navbar profile />
			<ThemeBtn />
			<Body showsVerticalScrollIndicator={false}>
				<Header>
					<Icon
						src={
							(data?.data.profileImg && { uri: data?.data.profileImg }) ||
							require('../assets/images/icon.png')
						}
						width={120}
						height={120}
						radius={15}
					/>
					<Box style={{ marginTop: 8, alignItems: 'flex-start' }}>
						<Box col style={{ marginRight: 10 }}>
							<Name>{data?.data?.username}</Name>
							<Title>{data?.data?.title || 'Add Title'}</Title>
						</Box>
						{user?._id === _id && (
							<TouchableOpacity onPress={() => setEditHeader((p) => !p)}>
								<MaterialIcons
									name="edit"
									size={22}
									color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
								/>
							</TouchableOpacity>
						)}
					</Box>
				</Header>

				<About>
					<Box style={{ justifyContent: 'space-between' }}>
						<Name bold sz={22}>
							About
						</Name>
						{user?._id === _id && (
							<TouchableOpacity
								onPress={() => {
									setEditAbout((p) => !p);
								}}
							>
								<MaterialIcons
									name="edit"
									size={22}
									color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
								/>
							</TouchableOpacity>
						)}
					</Box>
					<Name
						color={!data?.data?.bio && COLORS.gray50}
						style={{ marginVertical: 8 }}
						sz={18}
					>
						{data?.data?.bio || 'Add your bio'}
					</Name>
				</About>

				<Contact>
					<Box style={{ justifyContent: 'space-between' }}>
						<Name bold sz={22}>
							Contact
						</Name>
						{user?._id === _id && (
							<TouchableOpacity>
								<MaterialIcons
									name="edit"
									size={22}
									color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
								/>
							</TouchableOpacity>
						)}
					</Box>
					<Box style={{ justifyContent: 'flex-start', marginVertical: 8 }}>
						<Ionicons
							name="mail"
							size={24}
							color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
							style={{ marginRight: 15 }}
						/>
						<Name sz={18}>{data?.data?.email}</Name>
					</Box>
					<Box style={{ justifyContent: 'flex-start', marginVertical: 8 }}>
						<FontAwesome5
							name="link"
							size={24}
							color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
							style={{ marginRight: 15 }}
						/>
						<Name
							style={{
								color: data?.data?.profile ? COLORS.blue : COLORS.gray50,
							}}
							sz={18}
						>
							{data?.data?.profile || 'Add a link to your profile'}
						</Name>
					</Box>
				</Contact>

				<Activity
					onPress={() =>
						navigation.navigate('Activity', {
							userId: _id,
							username: data?.data?.username,
							title: data?.data?.title,
							img: data?.data?.profileImg,
						})
					}
				>
					<Box style={{ justifyContent: 'space-between' }}>
						<Name bold>Activity</Name>
						<AntDesign
							name="rightcircle"
							size={24}
							color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
						/>
					</Box>
				</Activity>

				<SubscribedTags>
					<Name bold>Subscribed Tags</Name>
					<Box style={{ justifyContent: 'flex-start', marginVertical: 8 }}>
						{tags?.data?.tags.length === 0 ? (
							<Name sz={16} color={COLORS.gray50}>
								You do not have any subscribed tags
							</Name>
						) : (
							tags?.data?.tags.map((tag) => (
								<Tag key={tag}>
									<Text size={12}>{'tag'.toUpperCase()}</Text>
								</Tag>
							))
						)}
					</Box>
				</SubscribedTags>

				<Actions>
					<Logout onPress={handleLogout}>
						<AntDesign
							name="logout"
							size={22}
							color={theme.name === 'dark' ? COLORS.white1 : COLORS.gray50}
							style={{ marginRight: 8 }}
						/>
						<Name
							bold
							sz={22}
							color={theme.name === 'dark' ? COLORS.white1 : COLORS.gray50}
						>
							Logout
						</Name>
					</Logout>
				</Actions>
			</Body>
			{renderEditHeaderModal()}
			{/* {renderEditAboutModal()} */}
		</Container>
	);
};

export default Profile;

//styles
const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;

const Body = styled.ScrollView`
	padding: 0 20px;
	margin: 8px 0 20px 0;
`;

const Box = styled.View`
	flex-direction: ${(p) => (p.col ? 'column' : 'row')};
	align-items: center;
	justify-content: center;
`;

const Header = styled.View`
	align-items: center;
	padding: 10px;
`;

const Name = styled.Text`
	font-family: Poppins_400Regular;
	font-weight: ${(p) => (p.bold ? 'bold' : 400)};
	font-size: ${(p) => p.sz || 24}px;
	color: ${(p) =>
		p.color || (p.theme.name === 'dark' ? COLORS.white1 : COLORS.black)};
`;

const Title = styled(Name)`
	font-size: 18px;
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.gray10 : COLORS.gray50)};
`;

const About = styled.View`
	padding: 14px;
	border-radius: ${SIZES.base}px;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkgrey : COLORS.white2};
	margin: 8px 0;
`;

const Contact = styled(About)``;

const Activity = styled.TouchableOpacity`
	border: ${(p) =>
		`1px solid ${p.theme.name === 'dark' ? COLORS.white1 : COLORS.black};`};
	margin: 8px 0;
	padding: 18px 10px;
	border-right-width: 0;
	border-left-width: 0;
`;

const SubscribedTags = styled.View`
	margin-bottom: 8px;
	padding: 10px;
	padding-top: 0;
`;

const Tag = styled.View`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.purple : COLORS.deepBlue};
	padding: 6px 10px;
	margin: 8px 8px 0 0;
	flex-direction: row;
	align-items: center;
	border-radius: ${SIZES.padding}px;
`;

const Text = styled.Text`
	color: ${(p) => p.color || COLORS.white1};
	font-family: Poppins_400Regular;
	font-weight: bold;
	font-size: ${(p) => p.size || 16}px;
	letter-spacing: 1px;
`;

const Actions = styled.View`
	/* margin: 8px 0; */
	padding: 0 10px;
	justify-content: center;
	align-items: center;
`;

const Logout = styled.TouchableOpacity`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkgrey : COLORS.white2};
	padding: 10px 20px;
	border-radius: 20px;
	flex-direction: row;
	align-items: center;
`;

const Label = styled.Text`
	font-size: 22px;
	font-family: Poppins_400Regular;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue};
`;

const Input = styled.TextInput`
	padding: 12px 15px;
	width: 100%;
	margin-top: 8px;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.purple2 : COLORS.white1};
	opacity: ${({ theme }) => (theme.name === 'dark' ? 0.5 : 1)};
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue};
	border-radius: ${SIZES.font}px;
	font-size: 18px;
	shadow-color: #233b7a;
	shadow-opacity: 1.5;
	shadow-radius: 20px;
	elevation: 10;
`;

const SaveBtn = styled.TouchableOpacity`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.purple2 : COLORS.deepBlue};
	align-items: center;
	border-radius: 10px;
	margin: 8px 0;
	padding: 10px 20px;
`;
