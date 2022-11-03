import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { COLORS } from "../constants";

const Loading = () => {
	return (
		<Container>
			<LottieView
				source={require("../assets/images/loading.json")}
				autoPlay
				style={{ width: 100, height: 100 }}
				speed={1.5}
			/>
		</Container>
	);
};

export default Loading;

//styles

const Container = styled.View`
	flex: 1;
	background-color: ${(p) =>
		p.theme.name === "dark" ? COLORS.darkPurple : COLORS.white1};
	justify-content: center;
	align-items: center;
`;
