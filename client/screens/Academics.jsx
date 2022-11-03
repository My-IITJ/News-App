import styled from "styled-components/native";
import Constants from "expo-constants";
import { COLORS } from "../constants";
import { Image, Text } from "react-native";
import Animated from "react-native-reanimated";
import NavBar from "../components/Navbar";
import Acad from "../components/Acad";

const Academics = ({ drawerAnimatedStyle }) => {
	return (
		<Container style={[drawerAnimatedStyle]}>
			<NavBar />
			<Acad />
		</Container>
	);
};

export default Academics;

//styles
const Container = styled(Animated.View)`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;