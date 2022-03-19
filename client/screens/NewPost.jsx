import { useState, useEffect} from 'react';
import {StatusBar, Text, TextInput, ScrollView, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { COLORS, SIZES, selectedTheme, darkTheme, lightTheme, icons} from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import InputScrollView from 'react-native-input-scroll-view';
import {useSelector } from 'react-redux';

const profile_image = require('../assets/images/me.png');
const Img_box_light = require('../assets/icons/Img_box_light.png');
const Video_file_light = require('../assets/icons/Video_file_light.png');
const Link_light = require('../assets/icons/Link_light.png');
const Chart_light = require('../assets/icons/Chart_light.png');
const Img_box_dark = require('../assets/icons/Img_box_dark.png');
const Video_file_dark = require('../assets/icons/Video_file_dark.png');
const Link_dark = require('../assets/icons/Link_dark.png');
const Chart_dark = require('../assets/icons/Chart_dark.png');

const tags = ["Acheivements", "Project", "Research", "Internship", "Advertisements", "Sport", "Promotion"];
const theme = selectedTheme.name;
const vis = ["Public", "Private"];

const NewPost = ({navigation}) => {
	const [showMenu, setShowMenu] = useState(false);
	const [showTags, setShowTags] = useState(false);
	const [selectedTags, setSelectedTags] = useState([]);
	const [activeTags, setActiveTags] = useState(Array(tags.length).fill(false));
	const [nTags, setNtags] = useState(0);
	const [visibility, setVisibility] = useState(vis[0]);
	const [text, onChangeText] = useState('');

	const ToggleTags = (prop) =>{
		let idx = prop.key1;
		if(nTags<=4 && !activeTags[idx]){
			setActiveTags([...activeTags.slice(0,idx), !activeTags[idx], ...activeTags.slice(idx+1)]);
			setNtags(nTags+1);
			setSelectedTags([...selectedTags, tags[idx]]);
		}
		if(activeTags[idx]){
			setActiveTags([...activeTags.slice(0,idx), !activeTags[idx], ...activeTags.slice(idx+1)]);
			setNtags(nTags-1);
			let idx1 = selectedTags.indexOf(tags[idx]);
			setSelectedTags([...selectedTags.slice(0,idx1), ...selectedTags.slice(idx1+1)]);
		}
	};

	const Tag_option_btn = (prop) =>  {
		return(
			activeTags[prop.key1] ?
				(<TagOptionBtn2 theme = {selectedTheme} onPress = {()=>ToggleTags(prop)}>
					<TagOptionText theme = {selectedTheme}>{prop.text}</TagOptionText>
				</TagOptionBtn2>) :
				(<TagOptionBtn1 theme = {selectedTheme} onPress = {()=>ToggleTags(prop)}>
					<TagOptionText theme = {selectedTheme}>{prop.text}</TagOptionText>
				</TagOptionBtn1>)
		);
	};

	const Tag_option_container = (prop) => {
		return(
			<TagOptionContainer1>
			{prop.text_list.map((tag,index)=>{
				return <Tag_option_btn key = {index}  key1 = {index} text = {tag}/>
			})}
			</TagOptionContainer1>
		);
	};

	const Tag_show_container = (prop) => {
		return(
			<TagShowContainer>
			{prop.text_list.map((tag,index)=>{
				return <Tag_show_cell key = {index} text = {tag}/>
			})}
			</TagShowContainer>
		);
	};

	const Tag_show_cell = (prop) =>  {
		return(
			activeTags[tags.indexOf(prop.text)] ?
				(<TagShowCell theme = {selectedTheme}>
					<TagShowText theme = {selectedTheme}>{prop.text}</TagShowText>
					<TagShowBtn onPress = {()=>ToggleTags1(prop)}>
						<MaterialIcons name="cancel" size={16} color={selectedTheme.name=='light' ? COLORS.white1 : COLORS.black}/>
					</TagShowBtn>
				</TagShowCell>) :
				(null)
		);
	};

	const ToggleTags1 = (prop) =>{
		const idx = tags.indexOf(prop.text);
		setActiveTags([...activeTags.slice(0,idx), !activeTags[idx], ...activeTags.slice(idx+1)]);
		setNtags(nTags-1);
		const idx1 = selectedTags.indexOf(tags[idx]);
		setSelectedTags([...selectedTags.slice(0,idx1), ...selectedTags.slice(idx1+1)]);
	};

	return (
		<Container theme = {selectedTheme}>
			<StatusBar barStyle = {theme == "light"? "dark-content": "light-content"} hidden = {false} translucent = {true}/>
			<Header>
				<CancelBtn onPress={() => navigation.goBack()}>
					<MaterialIcons name="cancel" size={24} color={selectedTheme.name=='light' ? COLORS.black : COLORS.white1}/>
				</CancelBtn>
				<StyledText theme = {selectedTheme}>
					Create Post
				</StyledText>
				<PostBtn theme = {selectedTheme}>
					<Text1>
						Post 
					</Text1>
				</PostBtn>
			</Header>
			<Line theme = {selectedTheme}/>
			<ProfileContainer>
				<Circle width = {50} height = {50} theme = {selectedTheme}>
					<Avatar source={profile_image} />
				</Circle>
				<DetailsContainer>
					<Text2 theme = {selectedTheme}>Name</Text2>
					<Text3 theme = {selectedTheme}>Role</Text3>
				</DetailsContainer>
				<VisContainer>
					<VisibileBtn theme = {selectedTheme} onPress = {()=>setShowMenu(!showMenu)}>
						<Text4>{visibility}</Text4>
						<MaterialIcons name="arrow-drop-down" size={24} color="white" />
					</VisibileBtn>
					{showMenu ?
					(<VisMenu>
						<VisOption1 theme = {selectedTheme} onPress = {()=>{setShowMenu(!showMenu); setVisibility(vis[0])}}>
							<Text5>Public</Text5>
						</VisOption1>
						<VisOption2 theme = {selectedTheme} onPress = {()=>{setShowMenu(!showMenu); setVisibility(vis[1])}}>
							<Text5>Private</Text5>
						</VisOption2>
					</VisMenu>) :
					(null)}
				</VisContainer>
			</ProfileContainer>
			<TagContainer>
				<Text6 theme = {selectedTheme}>Tags:</Text6>
				<TagBtn theme = {selectedTheme} onPress = {()=>setShowTags(true)}>
					<Text7>Select tags</Text7>
					<MaterialIcons name="arrow-drop-down" size={24} color={COLORS.gray1} />
				</TagBtn>
			</TagContainer>
			<TagInfo>
				<Text8 theme = {selectedTheme}>You can select maximum 5 tags</Text8>
			</TagInfo>
			<Tag_show_container text_list = {selectedTags} />
			<Desc>
				<Text9 theme = {selectedTheme}>Description</Text9>
				<DescContainer>
					<InputScrollView>
						<TextInput1 onChangeText={(x) => onChangeText(x)} multiline defaultValue = {text}/>
					</InputScrollView>
				</DescContainer>
			</Desc>
			<AttachContainer>
				<Text10 theme = {selectedTheme}>Attachments</Text10>
				<AttachContainer1>
					<AttachContainer2>
						<AttachBtn>
							<AttachImage source = {theme == 'light' ? Img_box_dark : Img_box_light}/>
						</AttachBtn>
						<Text11 theme = {selectedTheme}>Image</Text11>
					</AttachContainer2>
					<AttachContainer2>
						<AttachBtn>
							<AttachImage source = {theme == 'light' ? Video_file_dark : Video_file_light}/>
						</AttachBtn>
						<Text11 theme = {selectedTheme}>Video</Text11>
					</AttachContainer2>
					<AttachContainer2>
						<AttachBtn>
							<AttachImage source = {theme == 'light' ? Link_dark : Link_light}/>
						</AttachBtn>
						<Text11 theme = {selectedTheme}>Link</Text11>
					</AttachContainer2>
					<AttachContainer2>
						<AttachBtn>
							<AttachImage source = {theme == 'light' ? Chart_dark : Chart_light}/>
						</AttachBtn>
						<Text11 theme = {selectedTheme}>Poll</Text11>
					</AttachContainer2>
				</AttachContainer1>
			</AttachContainer>
			{showTags ?
				(<TagContainer1>
					<Tag_option_container text_list={tags} />
					<TagDoneContainer>
						<TagDoneBtn theme = {selectedTheme} onPress = {() => setShowTags(false)}>
							<TagDoneText theme = {selectedTheme}>Done</TagDoneText>
						</TagDoneBtn>
					</TagDoneContainer>
				</TagContainer1>) :
				(null)
			}
		</Container>
	);
};

export default NewPost;

//styles
const Container = styled.View`
	flex: 1;
	padding: 15px;
	padding-top: ${Constants.statusBarHeight + 10}px;
	background-color: ${(props) => props.theme.name == 'light'? lightTheme.backgroundColor1 : darkTheme.backgroundColor1};
`;

const Header = styled.View`
	flexDirection: row;
	align-items: center;
	justify-content: space-between;
`;

const CancelBtn = styled.TouchableOpacity`
    background-color: transparent;
    justify-content: center;
    align-items: center;
`;

const StyledText = styled.Text`
	color: ${(props) => props.theme.name == 'light'? COLORS.black : COLORS.white1};
	justify-content: center;
	font-size: 16px;
	font-weight: bold;
	align-items: center;
	width : 220px;
`;

const PostBtn = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	padding: 3px 15px;
	border-radius: 15px;
	background-color: ${(props) => props.theme.name == 'light'? COLORS.darkPurple : COLORS.pink};
`;

const Text1 = styled.Text`
	color: ${COLORS.white1};
`;

const Line = styled.View`
	background-color: ${(props) => props.theme.name == 'light'? COLORS.darkPurple : COLORS.pink};
	height: 1px;
	width: 100%;
	margin-vertical: 10px;
`;

const ProfileContainer = styled.View`
	flexDirection: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
`;

const Circle = styled.View`
	align-items: center;
	justify-content: center;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	border-radius: 25px;
	background-color: ${(props) => props.theme.name == 'light'? COLORS.darkPurple : COLORS.pink};
`;

const Avatar = styled.Image`
	width: 50px;
	height: 50px;
	border-radius: 25px;
`;

const DetailsContainer = styled.View`
	flex: 1;
	flexDirection: column;
	align-items: flex-start;
	justify-content: space-between;
	padding-left: 20px;
`;

const Text2 = styled.Text`
	font-size: 14px;
	font-weight: bold;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.name == 'light'? COLORS.black : COLORS.white1};
`;

const Text3 = styled.Text`
	font-size: ${12}px;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.name == 'light'? COLORS.black : COLORS.white1};
`;

const VisContainer = styled.View`
	flexDirection: column;
	align-items: center;
	justify-content: center;
`; 

const VisibileBtn = styled.TouchableOpacity`
	flexDirection: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${(props) => props.theme.name == 'light'? COLORS.darkPurple : COLORS.pink};
	border-radius: 18px;
	padding-horizontal: 10px;
	padding-vertical: 5px;
`;

const Text4 = styled.Text`
	color: ${COLORS.white1};
	padding-left: 10px;
`;

const VisMenu = styled.View`
	flexDirection: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 32px;
	left: -20px;
	zIndex: 1;
	border-radius: 10px;
`;

const VisOption1 = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.name == 'light'? COLORS.darkPurple : COLORS.pink};
	padding-vertical: 5px;
	width: 100px;
	borderTopLeftRadius: 10px;
	border:  0.5px solid ${COLORS.gray10};
`;

const VisOption2 = styled(VisOption1)`
	borderTopLeftRadius: 0px;
	borderBottomLeftRadius: 10px;
	borderBottomRightRadius: 10px;
`;

const Text5 = styled.Text`
	color: ${COLORS.white1};
`;

const TagContainer = styled.View`
	flexDirection: row;
	align-items: center;
	justify-content: flex-start;
	margin-top: 10px;
	padding-left: 20px;
`;

const Text6 = styled(Text2)`
	margin-right: 20px;
`;

const TagBtn = styled.TouchableOpacity`
	flex: 1;
	flexDirection: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${(props) => props.theme.name == 'light'? COLORS.white3 : COLORS.white1};
	margin-right: 5px;
	border-radius: 15px;
	padding-left: 20px; 
`;

const Text7 = styled.Text`
	color: ${COLORS.gray1};
	font-size: 14px;
`;

const TagInfo = styled.View`
	justify-content: center;
	align-items: center;
`;

const Text8 = styled.Text`
	color: ${(props) => props.theme.name == 'light'? COLORS.gray1 : COLORS.white1};
	font-size: 10px;
	margin-left: -45px;
`;

const TagContainer1 = styled.View`
	flexDirection: column;
	align-items: center;
	justify-content: space-around;
	padding: 20px;
	margin-left: -1px;
	background-color:${COLORS.darkPurple};
	zIndex: 1;
	width: ${SIZES.width + 2}px;
	position: absolute;
	borderTopWidth: 1px;
	borderRightWidth: 1px;
	borderLeftWidth: 1px;
	borderTopColor: ${COLORS.white1};
	borderRightColor: ${COLORS.white1};
	borderLeftColor: ${COLORS.white1};
	borderTopLeftRadius: 30px;
	borderTopRightRadius: 30px;
	bottom: 0px;
`;

const TagOptionContainer1 = styled.View`
	flexDirection: row;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: center;
`;

const TagOptionBtn1 = styled.TouchableOpacity`
	background-color: ${(props) => props.theme.name == 'light'? COLORS.white1 : COLORS.pink};
	padding-horizontal: 10px;
	padding-vertical: 10px;
	border-radius: 30px;
	margin: 5px; 
	border: 3px ${(props) => props.theme.name == 'light'? COLORS.white1 : COLORS.pink};
`;

const TagOptionBtn2 = styled(TagOptionBtn1)`
	border: 3px ${(props) => props.theme.name == 'light'? COLORS.blue1 : COLORS.pink1};
`;

const TagOptionText = styled.Text`
	color: ${(props) => props.theme.name == 'light'? COLORS.black : COLORS.white1};
	font-size: 14px;
`;

const TagDoneContainer = styled.View`
	align-items: center;
	justify-content: center;
	margin-top: 30px;
`;

const TagDoneBtn = styled.TouchableOpacity`
	background-color: ${(props) => props.theme.name == 'light'? COLORS.white1 : COLORS.pink};
	padding-horizontal: 100px;
	padding-vertical: 10px;
	border-radius: 30px;
`;

const TagDoneText = styled.Text`
	color: ${(props) => props.theme.name == 'light'? COLORS.black : COLORS.white1};
	font-size: 16px;
	font-weight: bold;
`;

const TagShowContainer = styled.View`
	flexDirection: row;
	align-items: center;
	align-content: center;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin-top: 5px;
	margin-left: 25px;
`;

const TagShowCell = styled.View`
	flexDirection: row;
	align-items: center;
	justify-content: space-between;
	margin-right: 10px;
	margin-bottom: 10px;
	padding-left: 10px;
	background-color: ${(props) => props.theme.name == 'light'? COLORS.darkPurple : COLORS.white1};
	border-radius: 10px;
`;

const TagShowText = styled.Text`
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.name == 'light'? COLORS.white1 : COLORS.black};
	margin-right: 10px;
	font-size: 12px;
`;

const TagShowBtn = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
`;

const Desc = styled.View`
	flexDirection: column;
	align-items: flex-start;
	justify-content: flex-start;
	margin-top: 15px;
`;

const Text9 = styled.Text`
	color: ${(props) => props.theme.name == 'light'? COLORS.black : COLORS.white1};
	font-size: 14px;
	font-weight: bold;
	margin-left: 10px;
`;

const DescContainer = styled.View`
	align-items: flex-start;
	justify-content: flex-start;
	margin-top: 10px;
	height: 350px;
	width: 100%;
	background-color: ${(props) => props.theme.name == 'light'? COLORS.white3 : COLORS.white1};
	border-radius: 15px;
`;

const TextInput1 = styled.TextInput`
	padding: 10px;
	height: 100%;
	width: 100%;
	textAlignVertical: top;
`;

const AttachContainer = styled.View`
	flexDirection: column;
	align-items: flex-start;
	justify-content: flex-start;
	margin-top: 15px;
`;

const Text10 = styled(Text9)`
`;

const AttachContainer1 = styled.View`
	flexDirection: row;
	align-items: center;
	width: 100%;
	justify-content: space-around;
	margin-top: 10px;
`;

const AttachContainer2 = styled.View`
	flexDirection: column;
	align-items: center;
	justify-content: space-between;
`;

const AttachBtn = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
`;

const AttachImage = styled.Image`
	width: 50px;
	height: 50px;
`;

const Text11 = styled.Text`
	color: ${(props) => props.theme.name == 'light'? COLORS.black : COLORS.white1};
	font-size: 12px;
	font-weight: bold;
`;




