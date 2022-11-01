import styled from "styled-components/native";
import { COLORS } from "../constants";

//temporary to be changed later

const NotFound = () => {
	return (
		<Container>
			<Image source={require("../assets/images/void_nobg.png")} />
			<Text>Sorry No Posts</Text>
		</Container>
	);
};

export default NotFound;

// styles

const Container = styled.View`
	height: 500px;
	justify-content: center;
	align-items: center;
`;

const Text = styled.Text`
	font-size: 20px;
	color: ${(p) => (p.theme.name === "dark" ? COLORS.gray50 : COLORS.gray10)};
	margin: 8px 15px;
`;

const Image = styled.Image`
	width: 200px;
	height: 200px;
`;
