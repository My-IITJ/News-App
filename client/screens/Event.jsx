import styled from "styled-components/native";
import { ScrollView } from "react-native";
import Constants from "expo-constants";
import { COLORS } from "../constants";
import NavBar from "../components/Navbar";
import Animated from "react-native-reanimated";
import Schedule from "../components/Schedule";

const Event = ({ drawerAnimatedStyle }) => {
	return (
		<Container style={[drawerAnimatedStyle]} onPress={() => {}}>
			<NavBar />
			<ScrollView>
				<Schedule date="4-6 November 22" event="Varchas Event" />
				<Schedule
					date="4-16 November 22"
					event="Student Feedback on all courses"
				/>
				<Schedule date="16 November 22" event="Fractal 3 Withdrawal " />
				<Schedule date="18 November 22" event="Buffer day" />
				<Schedule date="21 - 25 November 22" event="MAJOR TEST/ Evaluation " />
				<Schedule
					date="26-27 November 22"
					event="MAJOR TEST for M.Tech. executive "
				/>

				<Schedule date="30 November 22" event="Online submission of grade" />

				<Schedule
					date="30 November 22"
					event="Last date for submission of the course files"
				/>

				<Schedule date="1 December 22" event="Moderation Committee Meeting " />


				<Schedule date="8-9 December 22" event="Verification of grades " />

				<Schedule date="12 December 22" event="Generation of Grade card " />

				<Schedule
					date="22-27 December 22"
					event="Fee link activation for Old Students "
				/>

				<Schedule
					date="28 -31 December 22"
					event="Registration of Old Students"
				/>

				<Schedule
					date="31 December 22"
					event="Registration of New PG Students "
				/>

				<Schedule
					date="31 December 22"
					event="Vacation Ends (UG 2nd year onwards) "
				/>
			</ScrollView>
			{/* <Schedule /> */}
		</Container>
	);
};

export default Event;

//styles
const Container = styled(Animated.View)`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;

const Box = styled.View`
	position: absolute;
	color: red;
	top: 100px;
	right: 50px;
	font-size: 20px;
	border: 1px solid red;
	border-radius: 15px;
	padding: 8px 15px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const Text = styled.Text`
	color: red;
	font-size: 18px;
`;
