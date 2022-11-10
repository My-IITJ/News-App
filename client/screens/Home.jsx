import styled from "styled-components/native";
import { COLORS } from "../constants";
import React from "react";
import Navbar from "../components/Navbar";
import Constants from "expo-constants";
import PostsList from "../components/PostsList";
import { useSelector } from "react-redux";
import { useGetPosts } from "../apiCalls/post";
// import { Text } from 'react-native';

import Loading from "../components/Loading";
import {
	StyleProp,
	ViewStyle,
	Animated,
	StyleSheet,
	Platform,
	ScrollView,
	Text,
	SafeAreaView,
	I18nManager,
} from "react-native";
import { ROLES } from "../apiCalls/client";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { AnimatedFAB } from "react-native-paper";

const limit = 5;

const Home = ({
	animatedValue,
	visible,
	extended,
	label,
	animateFrom,
	style,
	iconMode,
}) => {
	const [isExtended, setIsExtended] = React.useState(true);
	const data2 = useSelector((s) => s.user.data);
	const navigation = useNavigation();
	const isIOS = Platform.OS === "ios";

	const onScroll = ({ nativeEvent }) => {
		const currentScrollPosition =
			Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

		setIsExtended(currentScrollPosition <= 0);
	};

	const fabStyle = { [animateFrom]: 16 };
	const {
		isLoading,
		isError,
		error,
		data,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useGetPosts(limit);

	if (isError) {
		return <Text>{error?.message}</Text>;
	}

	return (
		<Container>
			<Navbar />
			{isLoading ? (
				<Loading />
			) : (
				<PostsList
					onScroll={onScroll}
					getMorePosts={fetchNextPage}
					reachedEnd={!hasNextPage}
					busy={isFetchingNextPage}
					data={data}
					page="Home"
				/>
			)}
			{data2?.role === ROLES.FACULTY && (
				<AnimatedFAB
					icon={"plus"}
					label={"Create Post"}
					extended={isExtended}
					onPress={() => navigation.navigate("NewPost")}
					visible={visible}
					animateFrom={"right"}
					iconMode={"dynamic"}
					style={[styles.fabStyle, style, fabStyle]}
					fabStyle={{ backgroundColor: "white" }}
				/>
			)}
		</Container>
	);
};

export default Home;

//styles
const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === "dark" ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	fabStyle: {
		bottom: 16,
		right: 16,
		position: "absolute",
	},
});
