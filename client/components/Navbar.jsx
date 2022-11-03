import styled, { useTheme } from "styled-components/native";
import { Touchable, View } from "react-native";
import { COLORS, icons, SIZES } from "../constants";
import Icon from "./Icon";
import { TouchableOpacity } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ROLES } from "../apiCalls/client";
import { RFValue } from "react-native-responsive-fontsize";

const NavBar = ({ profile }) => {
	const theme = useTheme();
	const navigation = useNavigation();
	const data = useSelector((s) => s.user.data);

	return (
		<Container>
			<TouchableOpacity
				onPress={() => {
					navigation.toggleDrawer();
				}}
			>
				<Icon
					src={theme.name === "dark" ? icons.menu_light : icons.menu_dark}
					width={48}
					height={48}
				/>
			</TouchableOpacity>
			<View
				style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
			>
				<Icon src={icons.logo_home} width={48} height={48} />
				<Title>My IITJ</Title>
			</View>

			{/* {data?.role !== ROLES.GUEST && (
				<AddBtn onPress={() => navigation.navigate('NewPost')}>
					<Ionicons
						name="add"
						size={26}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
				</AddBtn>
			)} */}

			<TouchableOpacity
				onPress={() =>
					!profile && navigation.navigate("Profile", { _id: data?._id })
				}
			>
				<Icon
					src={{ uri: data?.profileImg }}
					width={45}
					height={45}
					radius={10}
					resizeMode="cover"
				/>
			</TouchableOpacity>
		</Container>
	);
};

export default NavBar;

//styles
const Container = styled.View`
	padding: 10px 20px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.Text`
	font-size: ${RFValue(20)}px;
	margin-left: 10px;
	font-weight: bold;
	font-family: Poppins_400Regular;
	color: ${(p) => (p.theme.name === "dark" ? COLORS.white1 : COLORS.black)};
`;

const AddBtn = styled.TouchableOpacity`
	border: ${(p) =>
		`2px solid ${p.theme.name === "dark" ? COLORS.white1 : COLORS.black}`};
	border-radius: ${SIZES.radius}px;
	padding: 3px;
	margin-right: 15px;
`;
