import styled from "styled-components/native";
import Constants from "expo-constants";
import { COLORS } from "../constants";
import { Image, Text } from "react-native";
import Animated from "react-native-reanimated";
import NavBar from "../components/Navbar";
import Ut from "../components/Ut";

const Utilities = ({ drawerAnimatedStyle }) => {
	return (
		<Container style={[drawerAnimatedStyle]}>
			<NavBar />
			<Ut />
		</Container>
	);
};

export default Utilities;

//styles
const Container = styled(Animated.View)`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;
