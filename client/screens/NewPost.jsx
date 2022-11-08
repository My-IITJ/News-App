// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Constants from 'expo-constants';
import { COLORS, icons, isSmall, SIZES } from '../constants';
import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import Icon from '../components/Icon';
import TagsSelect from '../components/TagsSelect';
import { useSelector } from 'react-redux';
import { useGetProfileDetails } from '../apiCalls/user';
import Loading from '../components/Loading';
import { useEditPost, useNewPost } from '../apiCalls/post';
import { Snackbar } from 'react-native-paper';

// Camera
import * as ImagePicker from 'expo-image-picker';

// upload to cloudinary
const cloudinary_url = `https://api.cloudinary.com/v1_1/myiitj/upload`;
const vis = ['Public', 'Private'];

const NewPost = ({ navigation, route: { params } }) => {
	const theme = useTheme();
	const [showMenu, setShowMenu] = useState(false);
	const [open, setOpen] = useState(false);
	const [visibility, setVisibility] = useState(
		params?.edit ? params?.post?.visibility : vis[0]
	);
	const [selectedTags, setSelectedTags] = useState([]);
	const [desc, setDesc] = useState(params?.edit ? params?.post?.content : '');
	const [attachments, setAttachments] = useState({
		image: null,
		video: null,
		links: [],
	});

	const [visible, setVisible] = useState(false);
  	const onToggleSnackBar = () => setVisible(!visible);
  	const onDismissSnackBar = () => setVisible(false);

	const user = useSelector((s) => s.user.data);

	const { isLoading, isError, error, data } = useGetProfileDetails(
		user._id,
		'new-post'
	);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			// aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		// console.log(result);

		if (!result.cancelled) {
			attachments.image = { ...result };
			setAttachments({ ...attachments });

			let base64Img = `data:image/jpg;base64,${result.base64}`;
			let body = {
				file: base64Img,
				upload_preset: 'vkcvvggf',
			};

			const { secure_url, public_id, width, height } = await fetch(
				cloudinary_url,
				{
					body: JSON.stringify(body),
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
				}
			).then((r) => r.json());
			console.log('done uploading');
			attachments.image = {
				...result,
				url: secure_url,
				public_id,
				width,
				height,
			};
			setAttachments({ ...attachments });
		}
	};

	const { mutate } = useNewPost();

	const { mutate: editMutate } = useEditPost();

	const toggleModal = useCallback(() => {
		setOpen((p) => !p);
	}, []);

	const toggleSelection = useCallback(
		(name) => {
			const idx = selectedTags.indexOf(name);
			if (idx !== -1) {
				let arr = selectedTags.filter((i) => i !== name);
				setSelectedTags(arr);
				return;
			}

			if (selectedTags.length === 5) {
				return;
			}

			setSelectedTags((p) => [...p, name]);
		},
		[selectedTags, setSelectedTags]
	);

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return <Text>{error?.message}</Text>;
	}

	return (
		<>
		<Container>
			<Header>
				<CancelBtn onPress={() => navigation.goBack()}>
					<Entypo
						name="cross"
						size={15}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
				</CancelBtn>
				<Title>{params?.edit ? 'Edit Post' : 'Create Post'}</Title>
				<Post
					onPress={() => {
						if (selectedTags.length === 0 || desc.length === 0) {
							onToggleSnackBar();
							console.log('error: invalid fields');
							return;
						}

						if (params?.edit) {
							editMutate({
								data: {
									userId: user?._id,
									content: desc,
									tags: [...selectedTags, visibility],
									visibility,
									image: {
										url: attachments.image?.url,
										public_id: attachments?.image?.public_id,
										width: attachments.image?.width,
										height: attachments.image?.height,
									},
								},
								postId: params?.post?._id,
							});
						} else {
							mutate({
								data: {
									author: user?._id,
									content: desc,
									tags: [...selectedTags, visibility],
									visibility,
									image: {
										url: attachments.image?.url,
										public_id: attachments?.image?.public_id,
										width: attachments.image?.width,
										height: attachments.image?.height,
									},
								},
							});
						}

						navigation.goBack();
					}}
				>
					<Text>Post</Text>
				</Post>
			</Header>

			<Line />

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 15,
				}}
			>
				<ProfileContainer>
					<Icon
						containerStyle={{ marginRight: 10 }}
						src={{ uri: data?.data?.profileImg }}
						radius={50}
					/>

					<Details>
						<Name>{data?.data?.username}</Name>
						<Position>{data?.data?.title}</Position>
					</Details>

					<VisibilityOptions>
						<VisibilityBtn onPress={() => setShowMenu(!showMenu)}>
							<Text>{visibility}</Text>
							<MaterialIcons
								name="arrow-drop-down"
								size={22}
								color={COLORS.white1}
							/>
						</VisibilityBtn>

						{showMenu && (
							<VisibilityMenu>
								<VisibilityOption
									top
									onPress={() => {
										setShowMenu(!showMenu);
										setVisibility(vis[0]);
									}}
								>
									<Text size={14}>Public</Text>
								</VisibilityOption>
								<VisibilityOption
									onPress={() => {
										setShowMenu(!showMenu);
										setVisibility(vis[1]);
									}}
								>
									<Text size={14}>Private</Text>
								</VisibilityOption>
							</VisibilityMenu>
						)}
					</VisibilityOptions>
				</ProfileContainer>

				<Tags>
					<Text color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}>Tags:</Text>
					<Group>
						<SelectTags onPress={toggleModal}>
							<Text color={COLORS.gray10}>Choose tags</Text>
							<AntDesign name="down" size={14} color={COLORS.gray10} />
						</SelectTags>
						<InfoLabel>You can select maximum 5 tags</InfoLabel>
					</Group>
				</Tags>

				<SelectedTags>
					{selectedTags?.map((tag) => {
						return (
							<Tag key={tag}>
								<Text color={theme.name === 'dark' ? COLORS.black : COLORS.white1} size={12}>{tag.toUpperCase()}</Text>
								<TouchableOpacity onPress={() => toggleSelection(tag)}>
									<Feather
										name="x"
										size={14}
										color={theme.name === 'dark' ? COLORS.black : COLORS.white1}
										style={{ marginLeft: 8 }}
									/>
								</TouchableOpacity>
							</Tag>
						);
					})}
				</SelectedTags>

				<Desc>
					<Text color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}>Description</Text>
					{/* <View style={{ height: '60%', backgroundColor: 'green' }}> */}
					{/* <InputScrollView style={{ backgroundColor: 'red', height: '100%' }}> */}
					<TextInput
						onChangeText={(text) => setDesc(text)}
						multiline
						value={desc}
						maxLength={2200}
						textAlignVertical="top"
					/>
					{/* </InputScrollView> */}
					{/* </View> */}
				</Desc>

				<AttachmentContainer>
					<Text color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}>Attachments</Text>
					<AttachmentOptions>
						<Attachment
							onPress={() => {
								pickImage();
							}}
						>
							<Icon
								width={40}
								height={40}
								src={
									theme.name === 'dark'
										? icons.img_box_light
										: icons.img_box_dark
								}
							/>
							<Text color={theme.name === 'dark' ? COLORS.white1 : COLORS.black} size={14}>
								Image
							</Text>
						</Attachment>
						<Attachment>
							<Icon
								width={40}
								height={40}
								src={
									theme.name === 'dark'
										? icons.video_file_light
										: icons.video_file_dark
								}
							/>
							<Text color={theme.name === 'dark' ? COLORS.white1 : COLORS.black} size={14}>
								Video
							</Text>
						</Attachment>
						<Attachment>
							<Icon
								width={40}
								height={40}
								src={theme.name === 'dark' ? icons.link_light : icons.link_dark}
							/>
							<Text color={theme.name === 'dark' ? COLORS.white1 : COLORS.black} size={14}>
								Link
							</Text>
						</Attachment>
						{/* <Attachment>
						<Icon src={theme.name === 'dark' ? Img_box_light : Img_box_dark} />
						<Text color={COLORS.black} size={14}>
							Poll
						</Text>
					</Attachment> */}
					</AttachmentOptions>
				</AttachmentContainer>
				{attachments.image && (
					<Image
						source={{ uri: attachments.image?.uri }}
						style={{
							width: '100%',
							height: 200,
							marginTop: 20,
							borderRadius: 20,
						}}
					/>
				)}
			</ScrollView>

			<TagsSelect
				selectedTags={selectedTags}
				open={open}
				toggleModal={toggleModal}
				toggleSelection={toggleSelection}
			/>
			
		</Container>
		<Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				duration={1000}
				>
				Input Tags and Post Description can't be empty!!
		</Snackbar>
		</>
	);
};

export default NewPost;

//styles
const Container = styled.View`
	flex: 1;
	padding: 20px;
	padding-top: ${Constants.statusBarHeight + 15}px;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 8px;
`;

const CancelBtn = styled.TouchableOpacity`
	background-color: transparent;
	justify-content: center;
	align-items: center;
	border: 0.5px solid
		${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.black)};
	border-radius: 50px;
	padding: 4px;
`;

const Title = styled.Text`
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.black)};
	font-size: 18px;
	font-weight: bold;
	font-family: Poppins_400Regular;
	flex: 1;
	margin-left: 15px;
`;

const Post = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	padding: 6px 18px;
	border-radius: ${SIZES.padding}px;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.purple : COLORS.deepBlue};
`;

const Text = styled.Text`
	color: ${(p) => p.color || COLORS.white1};
	font-family: Poppins_400Regular;
	font-weight: bold;
	font-size: ${(p) => p.size || 16}px;
	letter-spacing: 1px;
`;

const Line = styled.View`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.white1 : COLORS.gray10};
	height: 0.5px;
	width: 100%;
	margin: 10px 0;
`;

const ProfileContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	padding: 8px 0;
`;

const Details = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`;

const Name = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${18}px;
	font-weight: 700;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const Position = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${12}px;
	color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.white1 : COLORS.black};
`;

const VisibilityOptions = styled.View`
	align-items: center;
	justify-content: center;
`;

const VisibilityBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.purple : COLORS.deepBlue};
	border-radius: 12px;
	padding: 6px 14px;
`;

const VisibilityMenu = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	border: 0.5px solid ${COLORS.gray10};
	top: 30px;
	left: -15px;
	z-index: 1;
	border-radius: ${SIZES.base}px;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkPurple : COLORS.deepBlue};
`;

const VisibilityOption = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	padding: 6px 0;
	width: 100px;
	border: 0.5px solid ${COLORS.gray10};
	border-top-width: ${(p) => (p.top ? 0 : 0.5)}px;
	border-right-width: 0;
	border-bottom-width: 0;
	border-left-width: 0;
`;

const Tags = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
`;

const Group = styled.View`
	flex: 1;
	margin-left: 15px;
`;

const SelectTags = styled.TouchableOpacity`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.white1 : '#f5f6fa'};
	border-radius: 10px;
	padding: 10px 15px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const SelectedTags = styled.View`
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	padding: 8px 10px;
`;

const InfoLabel = styled.Text`
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.gray1 : COLORS.gray10)};
	font-size: 10px;
	font-weight: bold;
	margin-left: 4px;
`;

const Tag = styled.View`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue};
	padding: 6px 10px;
	margin: 8px 8px 0 0;
	flex-direction: row;
	align-items: center;
	border-radius: ${SIZES.padding}px;
`;

const Desc = styled.View`
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	margin-top: 15px;
`;

// const DescContainer = styled.View`
// 	align-items: flex-start;
// 	justify-content: flex-start;
// 	margin-top: 10px;
// 	height: 350px;
// 	width: 100%;
// 	background-color: ${(p) =>
// 		p.theme.name == 'light' ? COLORS.white3 : COLORS.white1};
// 	border-radius: 15px;
// `;

const TextInput = styled.TextInput`
	padding: 12px;
	width: ${SIZES.width - 40}px;
	height: 250px;
	border-radius: 10px;
	margin-top: 15px;
	background-color: ${(p) => COLORS.white2};
	font-size: 16px;
`;

const AttachmentContainer = styled.View`
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	margin-top: 15px;
`;

const AttachmentOptions = styled.View`
	flex-direction: row;
	align-items: center;
	width: 100%;
	justify-content: space-around;
	margin-top: 10px;
`;

const Attachment = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	align-items: center;
`;
